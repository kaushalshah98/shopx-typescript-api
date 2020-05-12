import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getWishListItems(userId: string): Promise<any> {
    const wishlistId = 'WISHLIST::' + userId;
    const query = `SELECT {items.product_id,p.name,p.price,p.image,p.quantity,p.description,p.details} 
        AS ${CONSTANT.WISHLIST_ITEMS}
        FROM  ${CONSTANT.BUCKET_NAME}  a 
         USE KEYS $1
         UNNEST a.${CONSTANT.WISHLIST_ITEMS} as items
         JOIN  ${CONSTANT.BUCKET_NAME} 
         p ON KEYS [items.product_id]`;
    try {
      return await this._bucket.query(query, [wishlistId]);
    } catch (error) {
      throw error;
    }
  }
}
