import { IOrder } from '@shared/model';
import { DBBucket } from '../../../../config/DbBucket';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async deleteOrder(userId: string, orderdoc: IOrder): Promise<any> {
    try {
      const orderId = 'ORDER::' + userId;
      return await this._bucket.upsert(orderId, orderdoc);
    } catch (error) {
      throw error;
    }
  }
}
