import { IOrderArray } from '@shared/model';
import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpMessage, HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  private status: string = HttpStatusCode.BadRequest;
  private message: string = HttpMessage.emptyMessage;
  constructor(private service: Service) {}
  public deleteOrder: ApiHandler = app.put(
    '/removeorder/:userid',
    async (req: Request, res: Response) => {
      try {
        if (!req.body) {
          this.message = HttpMessage.emptyBody;
          res.send(ResponseBuilder.buildResponse({ status: this.status, message: this.message }));
          return;
        }
        const userId: string = req.params.userid;
        const order: IOrderArray[][] = req.body;
        const result = await this.service.deleteOrder(userId, order);
        if (result === null) {
          res.send(ResponseBuilder.buildResponse({ status: this.status, message: this.message }));
          return;
        }
        const response: IApiResponse<any> = {
          status: HttpStatusCode.Ok,
          result,
          message: 'Order Deleted successfully'
        };
        res.send(ResponseBuilder.buildResponse(response));
      } catch (error) {
        res.send(ResponseBuilder.buildResponse({ status: this.status, message: error }));
      }
    }
  );
}
