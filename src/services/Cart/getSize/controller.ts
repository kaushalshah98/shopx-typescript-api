import { ICartSize } from '@shared/model';
import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {
  constructor(private service: Service) {}
  public getSize: ApiHandler = app.get(
    '/getwishlistitems:userid',
    async (req: Request, res: Response) => {
      try {
        const userId: string = req.params.userid;
        const result = await this.service.getSize(userId);
        if (result === null) {
          res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
          return;
        }
        const response: ApiResponse<ICartSize> = new ApiResponse<ICartSize>().setResult(result);
        response.setMessage('Cart Size Fetched successfully');
        res.send(ResponseBuilder.ok(response));
      } catch (error) {
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
      }
    }
  );
}
