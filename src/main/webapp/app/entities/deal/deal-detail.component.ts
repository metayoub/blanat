import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeal } from 'app/shared/model/deal.model';
import { IDealComment } from 'app/shared/model/deal-comment.model';

@Component({
  selector: 'jhi-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['deal-detail.component.scss'],
})
export class DealDetailComponent implements OnInit {
  deal: IDeal | null = null;
  comments: IDealComment[] = [];
  step: String = '';

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deal }) => {
      this.deal = deal;
      if (deal.dealComments.length > 0) this.comments = deal.dealComments;
    });
    this.step = 'deal';
    // eslint-disable-next-line no-console
    console.log(this.comments);
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
