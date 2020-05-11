import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}
  public removeItem: ApiHandler = app.put(
    '/removecartitem/:userid',
    async (req: Request, res: Response) => {
      try {
        const userId: string = req.params.userid;
        const productId: string = req.body.product_id;
        const result = await this.service.removeItem(userId, productId);
        if (result === null) {
          res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
          return;
        }
        const response: ApiResponse<any> = new ApiResponse<any>().setResult(result);
        response.setMessage('Item Removed successfully');
        res.send(ResponseBuilder.ok(response));
      } catch (error) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
      }
    }
  );
}
