import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlanatTestModule } from '../../../test.module';
import { DealDetailComponent } from 'app/entities/deal/deal-detail.component';
import { Deal } from 'app/shared/model/deal.model';

describe('Component Tests', () => {
  describe('Deal Management Detail Component', () => {
    let comp: DealDetailComponent;
    let fixture: ComponentFixture<DealDetailComponent>;
    const route = ({ data: of({ deal: new Deal(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlanatTestModule],
        declarations: [DealDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DealDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DealDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load deal on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.deal).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('Navigate', () => {
      it('Should go to deal', () => {
        const step = 'deal';
        comp.goToDeal();
        expect(comp.step).toEqual(step);
      });

      it('Should go to user', () => {
        const step = 'user';
        comp.goToUser();
        expect(comp.step).toEqual(step);
      });

      it('Should go to comments', () => {
        const step = 'comments';
        comp.goToComments();
        expect(comp.step).toEqual(step);
      });

      it('Should go to history', () => {
        const step = 'history';
        comp.goToHistory();
        expect(comp.step).toEqual(step);
      });

      it('Should go to report', () => {
        const step = 'report';
        comp.goToReport();
        expect(comp.step).toEqual(step);
      });

      it('Should go to track', () => {
        const step = 'track';
        comp.goToTrack();
        expect(comp.step).toEqual(step);
      });
    });
  });
});
