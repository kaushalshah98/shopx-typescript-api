import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}
  public addItems: ApiHandler = app.post('/AddTocart', async (req: Request, res: Response) => {
    try {
      if (req.body && Object.keys(req.body).length <= 0) {
        res.send(
          ResponseBuilder.buildResponse({
            status: HttpStatusCode.BadRequest,
            message: 'Invalid request (Invalid/Empty Body)'
          })
        );
        return;
      }
      const userId: string = req.body.userid;
      const productId: string = req.body.product_id;
      const result = await this.service.addItems(userId, productId);
      if (result === null) {
        const response: IApiResponse<any> = {
          status: HttpStatusCode.Ok,
          result: result,
          message: 'Item Already is in List'
        };
        res.send(ResponseBuilder.buildResponse(response));
        return;
      }
      const response: IApiResponse<any> = {
        status: HttpStatusCode.Ok,
        result: result,
        message: 'Item Added successfully'
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
  });
}
