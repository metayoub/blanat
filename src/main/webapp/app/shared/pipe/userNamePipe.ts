import { Pipe, PipeTransform } from '@angular/core';

import { DealUserService } from '../../entities/deal-user/deal-user.service';
import { DealUser } from 'app/shared/model/deal-user.model';

@Pipe({
  name: 'userPipe',
})
export class UserNamePipe implements PipeTransform {
  constructor(protected dealUserService: DealUserService) {}
  transform(user: DealUser, args?: any): any {
    if (user) {
      if (args === 'firstname') user.user?.firstName;
      if (args === 'lastname') user.user?.lastName;
      return user.user?.login;
    }
    return 'value';
  }
}
