import { Injectable, CanActivate, ExecutionContext, Logger, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

/**
 * @description This Guard will handle all request and write log
 * Tracking customers' activities to support sales and marketing.
 */

@Injectable()
export class TrackingGuard implements CanActivate {
  constructor(
    @Inject('TRACKING_SERVICE')
    private readonly client: ClientProxy
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();


    try {
      const user = this.client.send({ service: 'tracking', cmd: 'addEvent' }, {
        payload: request.query,
        event: `${request.method} ${request.url}`,
      })
        .toPromise();

      Logger.debug(user, 'TrackingGuard')
    } catch(e) {
      Logger.error(e);
    }


    Logger.debug({
      body: request.body,
      query: request.query,
    }, 'TrackingGuard')
    
    return true;
  }
}
