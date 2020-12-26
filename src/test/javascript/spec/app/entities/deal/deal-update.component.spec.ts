import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlanatTestModule } from '../../../test.module';
import { DealUpdateComponent } from 'app/entities/deal/deal-update.component';
import { DealService } from 'app/entities/deal/deal.service';
import { DealLocationService } from 'app/entities/deal-location/deal-location.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';

import { Deal } from 'app/shared/model/deal.model';
import { DealLocation } from 'app/shared/model/deal-location.model';
import { DealUserService } from 'app/entities/deal-user/deal-user.service';
import { DealCategoryService } from 'app/entities/deal-category/deal-category.service';
import { DealUser } from 'app/shared/model/deal-user.model';
import { DealCategory } from 'app/shared/model/deal-category.model';

describe('Component Tests', () => {
  describe('Deal Management Update Component', () => {
    let comp: DealUpdateComponent;
    let fixture: ComponentFixture<DealUpdateComponent>;
    let service: DealService;
    let serviceDealLocation: DealLocationService;
    let dealUserService: DealUserService;
    let dealCategoryService: DealCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlanatTestModule],
        declarations: [DealUpdateComponent],
        providers: [
          FormBuilder,
          {
            provide: ActivatedRoute,
            useValue: new MockActivatedRoute({
              deal: {
                dealLocationId: 123,
                ...new Deal(123),
              },
            }),
          },
        ],
      })
        .overrideTemplate(DealUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DealUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DealService);
      serviceDealLocation = fixture.debugElement.injector.get(DealLocationService);
      dealUserService = fixture.debugElement.injector.get(DealUserService);
      dealCategoryService = fixture.debugElement.injector.get(DealCategoryService);
    });

    describe('save', () => {
      it('should call dealLocationService on init', fakeAsync(() => {
        // Start
        const headers = new HttpHeaders().append('link', 'link;link');
        spyOn(serviceDealLocation, 'query').and.returnValue(
          of(
            new HttpResponse({
              body: [new DealLocation(123)],
              headers,
            })
          )
        );
        spyOn(serviceDealLocation, 'find').and.returnValue(
          of(
            new HttpResponse({
              body: [new DealLocation(123)],
              headers,
            })
          )
        );
        // WHEN
        comp.ngOnInit();
        tick();

        // THEN
        expect(serviceDealLocation.query).toHaveBeenCalled();
        expect(comp.deallocations && comp.deallocations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
      }));

      it('should call dealcategories on init', fakeAsync(() => {
        // Start
        const headers = new HttpHeaders().append('link', 'link;link');
        spyOn(dealCategoryService, 'query').and.returnValue(
          of(
            new HttpResponse({
              body: [new DealCategory(123)],
              headers,
            })
          )
        );
        // WHEN
        comp.ngOnInit();
        tick();

        // THEN
        expect(dealCategoryService.query).toHaveBeenCalled();
        expect(comp.dealcategories && comp.dealcategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
      }));

      it('should call dealusers on init', fakeAsync(() => {
        // Start
        const headers = new HttpHeaders().append('link', 'link;link');
        spyOn(dealUserService, 'query').and.returnValue(
          of(
            new HttpResponse({
              body: [new DealUser(123)],
              headers,
            })
          )
        );
        // WHEN
        comp.ngOnInit();
        tick();

        // THEN
        expect(dealUserService.query).toHaveBeenCalled();
        expect(comp.dealusers && comp.dealusers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
      }));

      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Deal(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Deal();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
