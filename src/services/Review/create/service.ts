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
      return await this.repository.createReview(productId, reviewdoc);
    } catch (error) {
      throw error;
    }
  }
}
