import { IWishList, IWishListArray } from '@shared/model';
import { Repository } from './repository';

export class Service {
  constructor(private repository: Repository) {}
  public async addItems(userId: string, productId: string): Promise<any> {
    try {
      const wishlistdoc: IWishList = {
        wishlistitems: [{ product_id: productId }],
        userid: userId,
        type: 'WISHLIST'
      };
      const result = await this.repository.checkList(userId);
      if (result.length <= 0) {
        const row = await this.repository.checkItem(userId, productId);
        if (row.length <= 0) {
          const item: IWishListArray = { product_id: productId };
          return await this.repository.updateList(userId, item);
        } else {
          return Promise.resolve(null);
        }
      } else {
        return await this.repository.createList(userId, wishlistdoc);
      }
    } catch (error) {
      throw error;
    }
  }
}
