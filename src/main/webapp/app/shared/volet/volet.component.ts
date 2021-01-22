import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'jhi-volet',
  templateUrl: './volet.component.html',
  styleUrls: ['./volet.component.scss'],
})
export class VoletComponent implements OnInit {
  @Input() public closed = false;
  @Input() public name: string;
  @Input() public filter: Array<any>;
  @Output() public onFilter: EventEmitter<any>;

  myForm: FormGroup;
  constructor() {
    this.name = '';
    this.onFilter = new EventEmitter();
    this.filter = [];
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.updateFiltre(this.filter);
  }

  updateFiltre(filtre: any): void {
    const group = {};
    filtre.forEach((element: any) => {
      switch (element.type) {
        case 'text':
          group[element.name] = new FormControl('');
          break;
        case 'checkbox':
          group[element.name] = new FormControl(element.isSelected);
          break;
        case 'select':
          group[element.name] = new FormControl(element.initValue);
          break;
        case 'date':
          if (element.isMin) group[element.nameMin] = new FormControl('');
          if (element.isMax) group[element.nameMax] = new FormControl('');
          break;
        case 'num':
          if (element.isMin) group[element.nameMin] = new FormControl('');
          if (element.isMax) group[element.nameMax] = new FormControl('');
          break;
        default: {
          break;
        }
      }
    });
    this.myForm = new FormGroup(group);
  }

  onSubmit(): void {
    this.onFilter.emit(this.myForm.value);
    this.closed = !this.closed;
  }

  resetForm(): void {
    this.myForm.reset();
  }
}
