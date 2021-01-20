import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'jhi-volet',
  templateUrl: './volet.component.html',
  styleUrls: ['./volet.component.scss'],
})
export class VoletComponent implements OnInit {
  @Input() public closed: boolean;
  @Input() public name: string;
  @Input() public filter: Array<any>;
  @Output() public onFilter: EventEmitter<any>;

  myForm: FormGroup;
  constructor() {
    this.closed = true;
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
      group[element.title] = new FormControl('');
    });
    this.myForm = new FormGroup(group);
  }

  onSubmit(): void {
    // eslint-disable-next-line no-console
    console.log('filtre');
  }
}
