import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { IReview } from 'shared/model';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}

  public getReviews: ApiHandler = app.get(
    '/getreviews/:product_id',
    async (req: Request, res: Response) => {
      try {
        const productId: string = req.params.product_id;
        const result = await this.service.getReviews(productId);
        if (result === null) {
          res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
          return;
        }
        const response: ApiResponse<IReview[]> = new ApiResponse<IReview[]>().setResult(result);
        response.setMessage('Reviews Fetched successfully');
        res.send(ResponseBuilder.ok(response));
      } catch (error) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
      }
    }
  );
}
