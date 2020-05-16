import { IReview } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getReviews(productId: string): Promise<any> {
    try {
      const result = await this.repository.getReviews(productId);
      if (result && result.length > 0) {
        return result[0].list as IReview[];
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
}
