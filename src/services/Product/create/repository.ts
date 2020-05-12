import { IProductItem } from 'shared/model';
import uuid from 'uuid';
import { DBBucket } from '../../../../config/DbBucket';
export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async createProduct(productdata: IProductItem): Promise<any> {
    const productId = 'PRODUCT::' + uuid.v4();
    productdata.product_id = productId;
    productdata.type = 'PRODUCT';

    try {
      return await this._bucket.insert(productId, productdata);
    } catch (error) {
      throw error;
    }
  }
}
