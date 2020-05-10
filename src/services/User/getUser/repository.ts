import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async getUser(userId: string): Promise<any> {
    const query = `SELECT * FROM ${CONSTANT.BUCKET_NAME} as \`user\` USE KEYS $1`;
    try {
      return await this._bucket.query(query, [userId]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
