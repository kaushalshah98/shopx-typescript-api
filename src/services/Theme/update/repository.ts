import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from 'shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async updateTheme(userId: string, theme: string): Promise<any> {
    const query = `UPDATE ${CONSTANT.BUCKET_NAME} USE KEYS $1 set ${CONSTANT.NIGHT_THEME}= $2`;
    try {
      return await this._bucket.query(query, [userId, theme]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
