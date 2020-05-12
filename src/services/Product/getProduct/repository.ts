import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getProduct(productId: string): Promise<any> {
    const query = `SELECT ${CONSTANT.BUCKET_NAME} as product FROM ${CONSTANT.BUCKET_NAME} USE KEYS $1`;
    try {
      return await this._bucket.query(query, [productId]);
    } catch (error) {
      throw error;
    }
  }
}
