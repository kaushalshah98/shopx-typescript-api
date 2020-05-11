import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getAllOrders(): Promise<any> {
    const query = `SELECT {u.name,u.profilepic,a.orders} AS orders
    FROM ${CONSTANT.BUCKET_NAME} a
    JOIN ${CONSTANT.BUCKET_NAME} u
    ON KEYS [a.userid]
    WHERE a.type='${CONSTANT.ORDER_TYPE}'`;
    try {
      return await this._bucket.query(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
