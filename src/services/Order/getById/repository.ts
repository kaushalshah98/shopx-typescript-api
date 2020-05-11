import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getUserOrder(userId: string): Promise<any> {
    const orderId = 'ORDER::' + userId;
    const query = `SELECT orders FROM  ${CONSTANT.BUCKET_NAME} USE KEYS $1`;
    try {
      return await this._bucket.query(query, [orderId]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
