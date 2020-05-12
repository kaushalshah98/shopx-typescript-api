import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpMessage, HttpStatusCode } from '../../../../shared/http-status-codes';
import { IUser } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  private status: string = HttpStatusCode.BadRequest;
  private message: string = HttpMessage.emptyMessage;

  constructor(private service: Service) {}

  public getAllUsers: ApiHandler = app.get('/getallusers', async (req: Request, res: Response) => {
    try {
      const result = await this.service.getAllUsers();
      if (result === null) {
        res.send(ResponseBuilder.buildResponse({ status: this.status, message: this.message }));
      }
      const response: IApiResponse<IUser[]> = {
        status: HttpStatusCode.Ok,
        message: 'Users Fetched successfully',
        result
      };
      res.send(ResponseBuilder.buildResponse(response));
    } catch (error) {
      console.error(error);
      res.send(ResponseBuilder.buildResponse({ status: this.status, message: error }));
    }
  });
}
