import { DBBucket } from '../../../../config/DbBucket';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async deleteProduct(productId: string): Promise<any> {
    try {
      return await this._bucket.remove(productId);
    } catch (error) {
      throw error;
    }
  }
}
