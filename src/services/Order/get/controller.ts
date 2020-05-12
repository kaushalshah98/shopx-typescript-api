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
  public getAllOrders: ApiHandler = app.get(
    '/getallorders',
    async (req: Request, res: Response) => {
      try {
        const result = await this.service.getAllOrders();
        if (result === null) {
          res.send(
            ResponseBuilder.buildResponse({
              status: HttpStatusCode.BadRequest,
              message: 'Empty Message'
            })
          );
          return;
        }
        const response: IApiResponse<IOrder[]> = {
          status: HttpStatusCode.Ok,
          result: result,
          message: 'Order Fetched successfully'
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
