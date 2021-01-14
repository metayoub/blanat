import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { IDealCategory } from 'app/shared/model/deal-category.model';

@Component({
  selector: 'jhi-deal-category-detail',
  templateUrl: './deal-category-detail.component.html',
})
export class DealCategoryDetailComponent implements OnInit {
  dealCategory: IDealCategory | null = null;
  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    isParent: [],
    categoryId: [],
  });

  constructor(protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm.disable();
    this.activatedRoute.data.subscribe(({ dealCategory }) => this.updateForm(dealCategory));
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
