import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async blockUser(userid: string, status: boolean): Promise<any> {
    const query = `UPDATE ${CONSTANT.BUCKET_NAME} USE KEYS $1 set status= $2`;
    try {
      return await this._bucket.query(query, [userid, status]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
