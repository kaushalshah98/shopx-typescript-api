import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { IListArray } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}

  public AddItems: ApiHandler = app.post(
    '/addtolist/:userid',
    async (req: Request, res: Response) => {
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
        const userId: string = req.params.userid;
        const list: IListArray[] = req.body;
        const result = await this.service.AddItems(userId, list);
        if (result === null) {
          res.send(
            ResponseBuilder.buildResponse({
              status: HttpStatusCode.BadRequest,
              message: 'Empty Message'
            })
          );
          return;
        }
        const response: IApiResponse<any> = {
          status: HttpStatusCode.Ok,
          message: 'Items Added To List successfully',
          result
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
