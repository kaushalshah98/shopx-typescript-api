import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';
import { ICartArray, ICartItem } from '../../../../shared/model';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async checkCart(userId: string): Promise<any> {
    try {
      const cartId = 'CART::' + userId;
      const query = `SELECT * FROM ${CONSTANT.BUCKET_NAME} USE KEYS $1`;
      return await this._bucket.query(query, [cartId]);
    } catch (error) {
      throw error;
    }
  }

  public async createCart(userId: string, cartdoc: ICartItem): Promise<any> {
    try {
      const cartId = 'CART::' + userId;
      return await this._bucket.insert(cartId, cartdoc);
    } catch (error) {
      throw error;
    }
  }

  public async updateCart(userId: string, item: ICartArray): Promise<any> {
    try {
      const query = `UPDATE ${CONSTANT.BUCKET_NAME}
      SET ${CONSTANT.CART_ITEMS} = ARRAY_APPEND( ${CONSTANT.CART_ITEMS},$1) 
      WHERE ${CONSTANT.USER_ID} = $2 
      AND type = '${CONSTANT.CART_TYPE}'`;
      return await this._bucket.query(query, [item, userId]);
    } catch (error) {
      throw error;
    }
  }

  public async updateItem(quantity: number, userId: string, productId: string): Promise<any> {
    try {
      const query = `UPDATE ${CONSTANT.BUCKET_NAME} AS a
      SET item.qty = $1
      FOR item IN ${CONSTANT.CART_ITEMS}
      WHEN item.product_id = $2
      AND type = '${CONSTANT.CART_TYPE}' AND a.userid = $3
      END;`;
      return await this._bucket.query(query, [quantity, productId, userId]);
    } catch (error) {
      throw error;
    }
  }

  public async getQuantity(userId: string, productId: string): Promise<any> {
    try {
      const cartId = 'CART::' + userId;
      const query = `SELECT list.qty FROM ${CONSTANT.BUCKET_NAME} 
      USE KEYS $1
      UNNEST ${CONSTANT.CART_ITEMS} AS list
      WHERE list.product_id = $2`;
      return await this._bucket.query(query, [cartId, productId]);
    } catch (error) {
      throw error;
    }
  }
}
