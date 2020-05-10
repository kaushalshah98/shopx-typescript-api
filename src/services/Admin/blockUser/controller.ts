import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { IUser } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {

  public blockUser: ApiHandler = app.put(
    '/blockuser/:userid',
    async (req: Request, res: Response) => {
      try {
        if (req.body && Object.keys(req.body).length <= 0) {
          res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Invalid request'));
          return;
        }
        const userId: string = req.params.userid;
        const status: boolean = req.body.status;
        const result = await this.service.blockUser(userId, status);
        if (result === null) {
          res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
          return;
        }
        const response: ApiResponse<IUser[]> = new ApiResponse<IUser[]>().setResult(result);
        response.setMessage('User Blocked successfully');
        res.send(ResponseBuilder.ok(response));
      } catch (error) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
      }
    }
  );
  constructor(private service: Service) {}
}
