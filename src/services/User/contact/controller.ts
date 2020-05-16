import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { IApiResponse } from '../../../../shared/api-response';
import { HttpMessage, HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  private status: string = HttpStatusCode.BadRequest;
  private message: string = HttpMessage.emptyMessage;
  constructor(private service: Service) {}
  public contactUs: ApiHandler = app.post('/sendmessage', async (req: Request, res: Response) => {
    try {
      if (req.body && Object.keys(req.body).length <= 0) {
        this.message = HttpMessage.emptyBody;
        res.send(ResponseBuilder.buildResponse({ status: this.status, message: this.message }));
        return;
      }
      const result = await this.service.contactUs(req.body);
      if (result === null) {
        res.send(ResponseBuilder.buildResponse({ status: this.status, message: this.message }));
        return;
      }
      const response: IApiResponse<any> = {
        status: HttpStatusCode.Ok,
        result,
        message: 'Message sent successfully'
      };
      res.send(ResponseBuilder.buildResponse(response));
    } catch (error) {
      res.send(ResponseBuilder.buildResponse({ status: this.status, message: error }));
      return;
    }
  });
}
