import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async removeItem(userId: string, productId: string): Promise<any> {
    try {
      const cartId = 'CART::' + userId;
      const query = `UPDATE ${CONSTANT.BUCKET_NAME} a USE KEYS $1
      SET a.cartitems = ARRAY items FOR items IN a.cartitems
      WHEN items.product_id != $2 END`;
      return await this._bucket.query(query, [cartId, productId]);
    } catch (error) {
      throw error;
    }
  }
}
