import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { IDealUser } from 'app/shared/model/deal-user.model';

@Component({
  selector: 'jhi-deal-user-detail',
  templateUrl: './deal-user-detail.component.html',
})
export class DealUserDetailComponent implements OnInit {
  authorities: string[] = [];
  disabled: Boolean = true;
  editForm = this.fb.group({
    id: '',
      gender: '',
      phone: '',
      address: '',
      city: '',
      birthDay: '',
      comment: '',
      notification: '',
      reporting: '',
      emailNotification: '',
      message: '',
      userId: '',
      dealSaveds: '',
      login: '',
      firstName: '',
      lastName: '',
      email: '',
      activated: '',
      authorities: '',
  });

  constructor(protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dealUser }) => {
      // this.dealUser=dealUser;
      this.updateForm(dealUser);
    });
  }
  updateForm(dealUser: IDealUser): void {
    this.editForm.patchValue({
      id: dealUser.id,
      gender: dealUser.gender,
      phone: dealUser.phone,
      address: dealUser.address,
      city: dealUser.city,
      birthDay: dealUser.birthDay,
      comment: dealUser.comment,
      notification: dealUser.notification,
      reporting: dealUser.reporting,
      emailNotification: dealUser.emailNotification,
      message: dealUser.message,
      userId: dealUser.userId,
      dealSaveds: dealUser.dealSaveds,
      login: dealUser.user?.login,
      firstName: dealUser.user?.firstName,
      lastName: dealUser.user?.lastName,
      email: dealUser.user?.email,
      activated: dealUser.user?.activated,
      authorities: dealUser.user?.authorities,
    });
  }

  previousState(): void {
    window.history.back();
  }
}
