import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async Login(username: string, password: string): Promise<any> {
    const query = `SELECT ${CONSTANT.BUCKET_NAME} as \`user\` 
      FROM  ${CONSTANT.BUCKET_NAME} 
      WHERE name= $1 and \`password\`= $2 
      AND type = '${CONSTANT.USER_TYPE}'`;
    try {
      return await this._bucket.query(query, [username, password]);
    } catch (error) {
      throw error;
    }
  }
}
