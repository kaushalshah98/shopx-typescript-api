import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getItems(userId: string): Promise<any | null> {
    const buylistId = 'BUYLIST::' + userId;
    const query = `SELECT list FROM  ${CONSTANT.BUCKET_NAME}  USE KEYS $1`;
    try {
      return await this._bucket.query(query, [buylistId]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
