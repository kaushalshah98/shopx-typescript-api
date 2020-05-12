import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';
import { IOrder, IOrderArray } from '../../../../shared/model';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async checkOrder(userId: string): Promise<any> {
    try {
      const orderId = 'ORDER::' + userId;
      const query = `SELECT * FROM  ${CONSTANT.BUCKET_NAME} USE KEYS $1`;
      return await this._bucket.query(query, [orderId]);
    } catch (error) {
      throw error;
    }
  }

  public async updateOrder(userId: string, order: IOrderArray[]): Promise<any> {
    try {
      const query = `UPDATE ${CONSTANT.BUCKET_NAME}
      SET ${CONSTANT.ORDERS} = ARRAY_APPEND( ${CONSTANT.ORDERS},$1) 
     WHERE ${CONSTANT.USER_ID} = $2 
     AND type = '${CONSTANT.ORDER_TYPE}'`;
      return await this._bucket.query(query, [order, userId]);
    } catch (error) {
      throw error;
    }
  }

  public async createOrder(userId: string, orderdoc: IOrder): Promise<any> {
    try {
      const orderId = 'ORDER::' + userId;
      return await this._bucket.insert(orderId, orderdoc);
    } catch (error) {
      throw error;
    }
  }
}
