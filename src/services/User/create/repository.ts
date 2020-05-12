import { IUser } from 'shared/model';
import uuid from 'uuid';
import { DBBucket } from '../../../../config/DbBucket';
export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async createUser(userdata: IUser): Promise<any> {
    const userId = 'USER::' + uuid.v4();
    userdata.userid = userId;
    userdata.role = 'user';
    userdata.type = 'USER';
    userdata.night_theme = false;
    try {
      return await this._bucket.insert(userId, userdata);
    } catch (error) {
      throw error;
    }
  }
}
