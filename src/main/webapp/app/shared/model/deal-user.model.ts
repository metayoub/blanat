import { Moment } from 'moment';
import { IDeal } from 'app/shared/model/deal.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { IUser } from 'app/core/user/user.model';

export interface IDealUser {
  id?: number;
  gender?: Gender;
  phone?: string;
  address?: string;
  city?: string;
  birthDay?: Moment;
  comment?: boolean;
  notification?: boolean;
  reporting?: boolean;
  emailNotification?: boolean;
  message?: boolean;
  deleted?: boolean;
  userId?: number;
  deals?: number;
  dealSaveds?: IDeal[];
  user?: IUser;
}

export class DealUser implements IDealUser {
  constructor(
    public id?: number,
    public gender?: Gender,
    public phone?: string,
    public address?: string,
    public city?: string,
    public birthDay?: Moment,
    public comment?: boolean,
    public notification?: boolean,
    public reporting?: boolean,
    public emailNotification?: boolean,
    public message?: boolean,
    public deleted?: boolean,
    public userId?: number,
    public deals?: number,
    public dealSaveds?: IDeal[],
    public user?: IUser
  ) {
    this.comment = this.comment || false;
    this.notification = this.notification || false;
    this.reporting = this.reporting || false;
    this.emailNotification = this.emailNotification || false;
    this.message = this.message || false;
    this.deleted = this.deleted || false;
  }
}
