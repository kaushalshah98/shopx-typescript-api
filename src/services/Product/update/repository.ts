import { IProductItem } from 'shared/model';
import { DBBucket } from '../../../../config/DbBucket';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async updateProduct(productId: string, productdata: IProductItem): Promise<any> {
    productdata.product_id = productId;
    productdata.type = 'PRODUCT';
    try {
      await this._bucket.upsert(productId, productdata);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
