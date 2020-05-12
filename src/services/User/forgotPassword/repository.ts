import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async forgotPassword(username: string, email: string): Promise<any> {
    const query = `SELECT \`password\` 
    FROM  ${CONSTANT.BUCKET_NAME} 
    WHERE name= $1 and email= $2 
    AND type = '${CONSTANT.USER_TYPE}'`;
    try {
      return await this._bucket.query(query, [username, email]);
    } catch (error) {
      throw error;
    }
  }
}
