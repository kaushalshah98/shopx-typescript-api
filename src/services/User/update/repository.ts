import { IUser } from 'shared/model';
import { DBBucket } from '../../../../config/DbBucket';
import { CONSTANT } from '../../../../shared/constant';

export class Repository {
  constructor(private readonly _bucket: DBBucket) {}

  public async updateUser(userId: string, userdata: IUser): Promise<any> {
    const name: string = userdata.name;
    const password: string = userdata.password;
    const email: string = userdata.email;
    const profilepic: string = userdata.profilepic;

    const query = `UPDATE ${CONSTANT.BUCKET_NAME} USE KEYS $1
                    set name=$2,\`password\`= $3, email= $4,profilepic =$5`;
    try {
      await this._bucket.query(query, [userId, name, password, email, profilepic]);
      return await this._bucket.get(userId);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
