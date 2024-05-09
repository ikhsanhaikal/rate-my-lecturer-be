import { User } from '.prisma/client';
import { Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';
interface UserInfo {
  family_name: string;
  name: string;
  picture: string;
  locale: string;
  email: string;
  given_name: string;
  id: string;
  verified_email: boolean;
}

interface UserSession {
  userId: number;
  token: string;
}

declare module 'express-session' {
  interface SessionData {
    user: UserSession;
  }
}
const CLIENT_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API
    : process.env.REACT_APP_PROD_API;

@Controller()
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Post('logout')
  async logout(@Req() request: Request): Promise<string> {
    request.session.destroy(function (err) {
      console.log(`destroy session: `, err);
    });
    return 'consider it done';
  }

  @Post('verify')
  async verify(@Req() request: Request): Promise<User> {
    const client = new OAuth2Client();
    client._clientId = process.env.CLIENT_ID;
    client._clientSecret = process.env.CLIENT_SECRET;

    console.log(`post /verify was called`);
    console.log(`request: `, request.body);

    if (request.body.code === undefined) {
      console.log(`no code was provided`);
      throw UnauthorizedException;
    }

    try {
      const getTokenResponse = await client.getToken({
        code: request.body.code,
        redirect_uri: CLIENT_BASE_URL,
      });

      client.setCredentials(getTokenResponse.tokens);

      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getTokenResponse.tokens.access_token}`,
          },
        },
      );
      const userInfo = (await response.json()) as UserInfo;

      const user = await this.prisma.user.upsert({
        where: { email: userInfo.email },
        update: {},
        create: {
          username: userInfo.name,
          email: userInfo.email,
        },
      });

      console.log(`user: `, user);
      console.log(`success`);

      request.session.user = {
        userId: user.id,
        token: getTokenResponse.tokens.id_token,
      };
      return user;
    } catch (error) {
      throw error;
    }
  }
}
