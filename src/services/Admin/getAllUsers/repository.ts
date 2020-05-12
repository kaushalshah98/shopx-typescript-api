import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getAllUsers(): Promise<any> {
    const query = `SELECT ${CONSTANT.BUCKET_NAME} as users 
    FROM  ${CONSTANT.BUCKET_NAME} 
    WHERE type = '${CONSTANT.USER_TYPE}'`;
    try {
      return await this._bucket.query(query);
    } catch (error) {
      throw error;
    }
  }
}
