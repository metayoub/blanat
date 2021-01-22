import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { VoletComponent } from 'app/shared/volet/volet.component';
import { BlanatTestModule } from '../../../test.module';

fdescribe('Component Tests', () => {
  describe('VoletComponent', () => {
    let comp: VoletComponent;
    let fixture: ComponentFixture<VoletComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [BlanatTestModule],
        declarations: [VoletComponent],
        providers: [],
      })
        .overrideTemplate(VoletComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VoletComponent);
      comp = fixture.componentInstance;
    }));

    it('updateFiltre should Been called with text input', fakeAsync(() => {
      const form = { title: '' };
      comp.filter = [{ label: 'title', name: 'title', type: 'text', initValue: 'title' }];
      // WHEN
      comp.ngOnInit();
      tick();
      // THEN
      expect(comp.myForm.value).toEqual(form);
    }));

    it('updateFiltre should Been called with multiple input', fakeAsync(() => {
      const form = { title: '', type: 'DEAL', likeMin: '', likeMax: '', isDeleted: false, dateEndMin: '', dateEndMax: '' };
      comp.filter = [
        { label: 'title', name: 'title', type: 'text', initValue: 'title' },
        { label: 'type', name: 'type', type: 'select', enum: ['DEAL', 'COUPON'], initValue: 'DEAL' },
        {
          label: 'like',
          name: 'like',
          type: 'num',
          isMin: true,
          nameMin: 'likeMin',
          initValueMin: 0,
          isMax: true,
          nameMax: 'likeMax',
          initValueMax: 100,
        },
        { label: 'isDeleted', name: 'isDeleted', type: 'checkbox', isSelected: false },
        {
          label: 'dateEnd',
          name: 'dateEnd',
          type: 'date',
          isMin: true,
          nameMin: 'dateEndMin',
          initValueMin: '',
          isMax: true,
          nameMax: 'dateEndMax',
          initValueMax: '',
        },
      ];
      // WHEN
      comp.ngOnInit();
      tick();
      // THEN
      expect(comp.myForm.value).toEqual(form);
    }));

    it('Should reset Form', fakeAsync(() => {
      const form = { title: null };
      comp.filter = [{ label: 'title', name: 'title', type: 'text', initValue: 'title' }];
      // WHEN
      comp.ngOnInit();
      comp.resetForm();
      tick();
      // THEN
      expect(comp.myForm.value).toEqual(form);
    }));
  });
});
