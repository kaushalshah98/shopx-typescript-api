import { IWishItem } from 'shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async getWishListItems(userId: string): Promise<any> {
    try {
      const result = await this.repository.getWishListItems(userId);
      if (result && result.length > 0) {
        const wishlist = result.map((data: any) => data.wishlistitems);
        return wishlist as IWishItem[];
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
