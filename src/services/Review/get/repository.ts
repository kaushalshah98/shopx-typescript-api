import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getReviews(productId: string): Promise<any> {
    const reviewId = 'REVIEW::' + productId;
    const query = `SELECT list FROM  ${CONSTANT.BUCKET_NAME} USE KEYS $1`;
    try {
      return await this._bucket.query(query, [reviewId]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
