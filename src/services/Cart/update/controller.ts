import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { IUser } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}

  public updateCart: ApiHandler = app.put(
    '/updatecartitem/:userid',
    async (req: Request, res: Response) => {
      try {
        if (req.body && Object.keys(req.body).length <= 0) {
          res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Invalid request'));
          return;
        }
        const userId: string = req.params.userid;
        const quantity: number = req.body.quantity;
        const product_id = req.body.product_id;
        const result = await this.service.updateCart(userId, quantity, product_id);
        if (result === null) {
          res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
          return;
        }
        const response: ApiResponse<IUser> = new ApiResponse<IUser>().setResult(result);
        response.setMessage('Cart Updated successfully');
        res.send(ResponseBuilder.ok(response));
      } catch (error) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
      }
    }
  );
}
