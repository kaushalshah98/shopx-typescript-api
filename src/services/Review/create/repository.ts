import { IReview } from 'shared/model';
import { DBBucket } from '../../../../config/DbBucket';
export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async createReview(productId: string, reviewdoc: IReview): Promise<any> {
    try {
      const reviewId = 'REVIEW::' + productId;
      return await this._bucket.upsert(reviewId, reviewdoc);
    } catch (error) {
      throw error;
    }
  }
}
