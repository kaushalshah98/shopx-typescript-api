import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getProductByCategory(category: string, innercategory: string): Promise<any> {
    const query = `SELECT ${CONSTANT.BUCKET_NAME} as product 
    FROM  ${CONSTANT.BUCKET_NAME} 
    WHERE type = '${CONSTANT.PRODUCT_TYPE}'
    AND ${CONSTANT.PRODUCT_INNERCATEGORY} = $1
    AND ${CONSTANT.PRODUCT_CATEGORY} =$2`;
    try {
      return await this._bucket.query(query, [innercategory, category]);
    } catch (error) {
      throw error;
    }
  }
}
