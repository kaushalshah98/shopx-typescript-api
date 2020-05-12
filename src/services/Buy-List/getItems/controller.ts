import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { IBuyList } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}

  public getItems: ApiHandler = app.get(
    '/getbuylistitems/:userid',
    async (req: Request, res: Response) => {
      try {
        const userId = req.params.userid;
        const result = await this.service.getItems(userId);
        if (result === null) {
          res.send(
            ResponseBuilder.buildResponse({
              status: HttpStatusCode.BadRequest,
              message: 'Empty Message'
            })
          );
        }
        const response: IApiResponse<IBuyList[]> = {
          status: HttpStatusCode.Ok,
          message: 'Items Fetched successfully',
          result: result
        };
        res.send(ResponseBuilder.buildResponse(response));
      } catch (error) {
        console.error(error);
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
