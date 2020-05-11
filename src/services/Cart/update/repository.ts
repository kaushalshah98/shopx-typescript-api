import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async updateCart(userId: string, quantity: number, productId: string): Promise<any> {
    const query = `UPDATE ${CONSTANT.BUCKET_NAME}
    SET item.qty =  $1 
    FOR item IN ${CONSTANT.CART_ITEMS} 
    WHEN item.product_id = $2 END
    WHERE type= '${CONSTANT.CART_TYPE}' 
    AND userid = $3`;
    try {
      await this._bucket.query(query, [quantity, productId, userId]);
      return await this._bucket.get(userId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
