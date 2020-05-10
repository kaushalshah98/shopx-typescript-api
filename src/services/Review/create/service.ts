import { IReview, IReviewList } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async createReview(productId: string, reviews: IReviewList[]): Promise<any> {
    try {
      const reviewdoc: IReview = {
        list: reviews,
        product_id: productId,
        type: 'REVIEW'
      };
      const result = await this.repository.createReview(productId, reviewdoc);
      if (result.length <= 0) {
        return Promise.resolve(null);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
