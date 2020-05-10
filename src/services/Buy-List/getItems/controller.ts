import { Request, Response } from 'express';
import { ApiHandler } from 'shared/api.interfaces';
import { IBuyList } from 'src/shared/model';
import { app } from '../../../../config/export';
import { ApiResponse } from '../../../../shared/api-response';
import { HttpStatusCode } from '../../../../shared/http-status-codes';
import { ResponseBuilder } from '../../../../shared/response-builder';
import { Service } from './service';

export class Controller {

  public getItems: ApiHandler = app.get(
    '/getbuylistitems/:userid',
    async (req: Request, res: Response) => {
      try {
        const userId = req.params.userid;
        const result = await this.service.getItems(userId);
        if (result === null) {
          res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, 'Empty Message'));
        }
        const response: ApiResponse<IBuyList[]> = new ApiResponse<IBuyList[]>().setResult(result);
        response.setMessage('Items Fetched successfully');
        res.send(ResponseBuilder.ok(response));
      } catch (error) {
        console.error(error);
        res.send(ResponseBuilder.badRequest(HttpStatusCode.BadRequest, error));
      }
    }
  );
  constructor(private service: Service) {}
}
