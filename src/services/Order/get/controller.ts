import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { IOrder } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}
  public getAllOrders: ApiHandler = app.get(
    '/getallorders',
    async (req: Request, res: Response) => {
      try {
        const result = await this.service.getAllOrders();
        if (result === null) {
          res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
          return;
        }
        const response: ApiResponse<IOrder[]> = new ApiResponse<IOrder[]>().setResult(result);
        response.setMessage('Orders Fetched successfully');
        res.send(ResponseBuilder.ok(response));
      } catch (error) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
      }
    }
  );
}
