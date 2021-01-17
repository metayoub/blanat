import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeal } from 'app/shared/model/deal.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DealService } from './deal.service';
import { DealDeleteDialogComponent } from './deal-delete-dialog.component';

@Component({
  selector: 'jhi-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['deal.scss'],
})
export class DealComponent implements OnInit, OnDestroy {
  deals: IDeal[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  closed: boolean;
  hasNextPage = true;

  constructor(
    protected dealService: DealService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.deals = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = false;
    this.closed = true;
  }

  loadAll(): void {
    if (this.hasNextPage) {
      this.dealService
        .query({
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe((res: HttpResponse<IDeal[]>) => this.paginateDeals(res.body, res.headers));
    }
  }

  reset(): void {
    this.page = 0;
    this.deals = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDeals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDeal): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDeals(): void {
    this.eventSubscriber = this.eventManager.subscribe('dealListModification', () => this.reset());
  }

  delete(deal: IDeal): void {
    const modalRef = this.modalService.open(DealDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.deal = deal;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  onScroll(): void {
    this.loadPage(this.page + 1);
  }

  protected paginateDeals(data: IDeal[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.deals.push(data[i]);
      }
      if (this.deals.length === Number(headers.get('X-Total-Count'))) {
        this.hasNextPage = false;
      }
    }
  }
}
