import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getAllProducts(): Promise<any> {
    const query = `SELECT ${CONSTANT.BUCKET_NAME} as product 
    FROM  ${CONSTANT.BUCKET_NAME} 
    WHERE type = '${CONSTANT.PRODUCT_TYPE}'`;
    try {
      return await this._bucket.query(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
