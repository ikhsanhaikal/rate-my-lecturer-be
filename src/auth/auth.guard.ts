import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | boolean | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    console.log('hey auth guard here...');
    //console.log('req: ', ctx.getContext().req);
    console.log('sessionId: ', ctx.getContext().req.sessionID);
    console.log('session.user: ', ctx.getContext().req.session.user);
    console.log('--------');
    if (ctx.getContext().req.session.user !== undefined) {
      console.log('user session was found');
      return true;
    }
    console.log('no user session was found');
    return false;
  }
}
