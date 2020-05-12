import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';
import { IOrder } from '@shared/model';

export class Controller {
  constructor(private service: Service) {}
  public getUserOrder: ApiHandler = app.get(
    '/getUserOrder/:userid',
    async (req: Request, res: Response) => {
      try {
        const userId: string = req.params.userid;
        const result = await this.service.getUserOrder(userId);
        if (result === null) {
          res.send(
            ResponseBuilder.buildResponse({
              status: HttpStatusCode.BadRequest,
              message: 'Empty Message'
            })
          );
          return;
        }
        const response: IApiResponse<IOrder> = {
          status: HttpStatusCode.Ok,
          result: result,
          message: 'User Order Fetched successfully'
        };
        res.send(ResponseBuilder.buildResponse(response));
      } catch (error) {
        res.send(
          ResponseBuilder.buildResponse({
            status: HttpStatusCode.BadRequest,
            message: error
          })
        );
      }
    }
  );
}
