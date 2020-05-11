import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getSize(userId: string): Promise<any> {
    const cartId = 'CART::' + userId;
    const query = `SELECT COUNT(items) AS cartsize
      FROM  ${CONSTANT.BUCKET_NAME} USE KEYS $1
      UNNEST ${CONSTANT.CART_ITEMS} as items`;
    try {
      return await this._bucket.query(query, [cartId]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
