import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpMessage, HttpStatusCode } from '../../../../shared/http-status-codes';
import { IProductItem } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
private status: string = HttpStatusCode.BadRequest;
  private message: string = HttpMessage.emptyMessage;
  constructor(private service: Service) {}  public createProduct: ApiHandler = app.post(
    '/addproduct',
    async (req: Request, res: Response) => {
      try {
        if (req.body && Object.keys(req.body).length <= 0) {
          this.message = HttpMessage.emptyBody;
          res.send(ResponseBuilder.buildResponse({ status: this.status, message: this.message }));
          return;
        }
        const productdata: IProductItem = req.body;
        const result = await this.service.createProduct(productdata);
        if (result === null) {
                 res.send(ResponseBuilder.buildResponse({ status: this.status, message: this.message }));

          return;
        }
        const response: IApiResponse<any> = {
          status: HttpStatusCode.Ok,
          result,
          message: 'Product Created successfully'
        };
        res.send(ResponseBuilder.buildResponse(response));
      } catch (error) {
             res.send(ResponseBuilder.buildResponse({ status: this.status, message: error }));

      }
    }
  );
}
