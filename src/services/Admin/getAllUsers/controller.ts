import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { IUser } from '../../../../shared/model';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {

  public getAllUsers: ApiHandler = app.get('/getallusers', async (req: Request, res: Response) => {
    try {
      const result = await this.service.getAllUsers();
      if (result === null) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
      }
      const response: ApiResponse<IUser[]> = new ApiResponse<IUser[]>().setResult(result);
      response.setMessage('Users Fetched successfully');
      res.send(ResponseBuilder.ok(response));
    } catch (error) {
      console.error(error);
      res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
    }
  });
  constructor(private service: Service) {}
}
