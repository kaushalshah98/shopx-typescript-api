import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  public contactUs: ApiHandler = app.post('/sendmessage', async (req: Request, res: Response) => {
    try {
      if (req.body && Object.keys(req.body).length <= 0) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Invalid request'));
        return;
      }

      const result = await this.service.contactUs(req.body);
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
  constructor(private service: Service) {}
}
