import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { IUser } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}
  public createUser: ApiHandler = app.post('/createuser', async (req: Request, res: Response) => {
    try {
      if (req.body && Object.keys(req.body).length <= 0) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Invalid request'));
        return;
      }
      const userdata: IUser = req.body;
      const result = await this.service.createUser(userdata);
      if (result === null) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
        return;
      }
      const response: ApiResponse<any> = new ApiResponse<any>().setResult(result);
      response.setMessage('User Created successfully');
      res.send(ResponseBuilder.ok(response));
    } catch (error) {
      res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
    }
  });
}
