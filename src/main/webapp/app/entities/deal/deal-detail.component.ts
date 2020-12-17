import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeal } from 'app/shared/model/deal.model';

@Component({
  selector: 'jhi-deal-detail',
  templateUrl: './deal-detail.component.html',
})
export class DealDetailComponent implements OnInit {
  deal: IDeal | null = null;
  step: String = '';

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deal }) => (this.deal = deal));
    this.step = 'home';
  }

  previousState(): void {
    window.history.back();
  }

  goToHome(): void {
    this.step = 'home';
  }
  goToProfile(): void {
    this.step = 'profile';
  }
  goToMessages(): void {
    this.step = 'messages';
  }
  goToSettings(): void {
    this.step = 'settings';
  }
}
