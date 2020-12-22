import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeal } from 'app/shared/model/deal.model';
import { IDealComment } from 'app/shared/model/deal-comment.model';
import { IDealHistory } from 'app/shared/model/deal-history.model';

@Component({
  selector: 'jhi-deal-detail',
  templateUrl: './deal-detail.component.html',
})
export class DealDetailComponent implements OnInit {
  deal: IDeal | null = null;
  comments: IDealComment[] = [];
  histories: IDealHistory[] = [];
  step: String = '';

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deal }) => {
      this.deal = deal;
      if (deal.dealComments.length > 0) this.comments = deal.dealComments;
      if (deal.dealHistories.length > 0) this.histories = deal.dealHistories;
    });
    this.step = 'deal';
    this.comments.sort(function (a, b): any {
      return a.id! < b.id! ? -1 : a.id! > b.id! ? 1 : 0;
    });
    // eslint-disable-next-line no-console
    console.log(this.deal);
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
