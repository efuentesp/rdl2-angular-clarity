import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Input()
  label: string;
  @Input()
  for: string;
  @Input()
  required: string;
  @Input()
  type: string;
  @Input()
  value: string;
  @Input()
  place: string;
  @Input()
  span: string;
  @Input()
  hidden: string;
  @Input()
  disabled: string;
  @Input()
  items: Array<any>;
  @Input()
  modalname: boolean;

  @Input()
  _formGroup: FormGroup;

  ngOnInit() {

    console.log("NameModal", this.modalname);
  }

}
