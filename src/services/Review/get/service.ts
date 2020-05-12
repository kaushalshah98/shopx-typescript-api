import { IReview } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getReviews(productId: string): Promise<any> {
    try {
      const result = await this.repository.getReviews(productId);
      if (result) {
        return result[0].list as IReview[];
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}
