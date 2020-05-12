import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async removeItem(userId: string, productId: string): Promise<any> {
    try {
      const wishlistId = 'WISHLIST::' + userId;
      const query = `UPDATE ${CONSTANT.BUCKET_NAME} a USE KEYS $1
      SET a.wishlistitems = ARRAY items FOR items IN a.wishlistitems
      WHEN items.product_id != $1 END`;
      return await this._bucket.query(query, [wishlistId, productId]);
    } catch (error) {
      throw error;
    }
  }
}
