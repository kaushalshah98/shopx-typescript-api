import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { IReview } from 'shared/model';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
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
          res.send(
            ResponseBuilder.buildResponse({
              status: HttpStatusCode.BadRequest,
              message: 'Empty Message'
            })
          );
          return;
        }
        const response: IApiResponse<IReview[]> = {
          status: HttpStatusCode.Ok,
          result,
          message: 'Review Fetched successfully'
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
