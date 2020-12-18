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
    this.step = 'deal';
  }

  previousState(): void {
    window.history.back();
  }

  goToDeal(): void {
    this.step = 'deal';
  }
  goToUser(): void {
    this.step = 'user';
  }
  goToComments(): void {
    this.step = 'comments';
  }
  goToHistory(): void {
    this.step = 'history';
  }
  goToReport(): void {
    this.step = 'report';
  }
  goToTrack(): void {
    this.step = 'track';
  }
}
