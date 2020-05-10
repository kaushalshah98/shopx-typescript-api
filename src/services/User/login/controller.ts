import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { IUser } from '../../../../shared/model';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  public Login: ApiHandler = app.put('/verifyuser', async (req: Request, res: Response) => {
    try {
      if (req.body && Object.keys(req.body).length <= 0) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Invalid request'));
        return;
      }
      const username: string = req.body.name;
      const password: string = req.body.password;
      // const { name, password }: { name: string; password: string } = req.body;
      const result = await this.service.Login(username, password);
      if (result === null) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
        return;
      }
      const response: ApiResponse<IUser> = new ApiResponse<IUser>().setResult(result);
      response.setMessage('User Verified successfully');
      res.send(ResponseBuilder.ok(response));
    } catch (error) {
      res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
    }
  });
  constructor(private service: Service) {}
}
