import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { IDealCategory } from 'app/shared/model/deal-category.model';
import { DealCategoryService } from './deal-category.service';

@Component({
  selector: 'jhi-deal-category-detail',
  templateUrl: './deal-category-detail.component.html',
})
export class DealCategoryDetailComponent implements OnInit {
  dealCategory: IDealCategory | null = null;
  dealcategories: IDealCategory[] = [];
  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    isParent: [],
    categoryId: [],
  });

  constructor(protected dealCategoryService: DealCategoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm.disable();
    this.activatedRoute.data.subscribe(({ dealCategory }) => this.updateForm(dealCategory));
    this.dealCategoryService.find(this.editForm.get('categoryId')!.value).subscribe((res: HttpResponse<IDealCategory>) => {
      this.editForm.patchValue({ categoryId: res.body!.name || '' });
    });
  }

  updateForm(dealCategory: IDealCategory): void {
    this.editForm.patchValue({
      id: dealCategory.id,
      name: dealCategory.name,
      description: dealCategory.description,
      isParent: dealCategory.isParent,
      categoryId: dealCategory.categoryId,
    });
  }

  previousState(): void {
    window.history.back();
  }
}
