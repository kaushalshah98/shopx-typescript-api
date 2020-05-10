import { DBBucket } from '../../../../config/DbBucket';
import { IBuyList } from '../../../../shared/model';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async AddItems(userId: string, listDoc: IBuyList): Promise<any> {
    const buylistId = 'BUYLIST::' + userId;
    try {
      return await this._bucket.upsert(buylistId, listDoc);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
