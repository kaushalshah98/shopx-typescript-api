import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { IUser } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}

  public getAllUsers: ApiHandler = app.get('/getallusers', async (req: Request, res: Response) => {
    try {
      const result = await this.service.getAllUsers();
      if (result === null) {
        res.send(
          ResponseBuilder.buildResponse({
            status: HttpStatusCode.BadRequest,
            message: 'Empty Message'
          })
        );
      }
      const response: IApiResponse<IUser[]> = {
        status: HttpStatusCode.Ok,
        result,
        message: 'Users Fetched successfully'
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
  });
}
