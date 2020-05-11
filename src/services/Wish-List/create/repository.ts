import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';
import { IWishList, IWishListArray } from '../../../../shared/model';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async checkList(userId: string): Promise<any> {
    try {
      const wishlistId = 'WISHLIST::' + userId;
      const query = `SELECT * FROM ${CONSTANT.BUCKET_NAME} USE KEYS $1`;
      return await this._bucket.query(query, [wishlistId]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async createList(userId: string, listdoc: IWishList): Promise<any> {
    try {
      const wishlistId = 'WISHLIST::' + userId;
      return await this._bucket.insert(wishlistId, listdoc);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateList(userId: string, item: IWishListArray): Promise<any> {
    try {
      const query = `UPDATE ${CONSTANT.BUCKET_NAME}
      SET ${CONSTANT.WISHLIST_ITEMS} = ARRAY_APPEND( ${CONSTANT.WISHLIST_ITEMS},$1) 
      WHERE ${CONSTANT.USER_ID} = $1 
      AND type = '${CONSTANT.WISHLIST_TYPE}'`;
      return await this._bucket.query(query, [item, userId]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async checkItem(userId: string, productId: string): Promise<any> {
    try {
      const wishlistId = 'WISHLIST::' + userId;
      const query = `SELECT * FROM ${CONSTANT.BUCKET_NAME} USE KEYS $1
      UNNEST ${CONSTANT.WISHLIST_ITEMS} as list WHERE list.product_id = $2`;
      return await this._bucket.query(query, [wishlistId, productId]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
