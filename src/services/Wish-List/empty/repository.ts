import { DBBucket } from '../../../../config/DbBucket';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async clearWishList(userId: string): Promise<any> {
    try {
      const wishlistId = 'WISHLIST::' + userId;
      return await this._bucket.remove(wishlistId);
    } catch (error) {
      throw error;
    }
  }
}
