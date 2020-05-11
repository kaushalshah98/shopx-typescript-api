import { DBBucket } from '../../../../config/DbBucket';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async clearCart(userId: string): Promise<any> {
    try {
      const cartId = 'CART::' + userId;
      return await this._bucket.remove(cartId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
