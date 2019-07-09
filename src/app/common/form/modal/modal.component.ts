import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Input() id: string = '';
  @Input() required: boolean = true;
  @Input() type: string = ''
  @Input() label: string = ''
  @Input() help: string = ''
  @Input() placeholder: string = ''
  @Input() error: string = ''
  @Input() hidden: boolean = false;
  @Input() disabled: boolean = false;
  @Input() linecount: number = 0;
  @Input() _formGroup: FormGroup;
  @Input() _formControlName: FormControlName;
  @Input() isDialogOpen: boolean = false;
  @Input() items: any[];
  @Input() baseEntity: any[];
  @Input() headers: any[];

  @Output() onCancelSelect = new EventEmitter<boolean>();
  objectAttrs: any[];

  @Output() onSelectElement = new EventEmitter<string>();

  ngOnInit() {

    this.objectAttrs = this.baseEntity;

  }

  closeModal() {
    this.isDialogOpen = false;
    this.onCancelSelect.emit(this.isDialogOpen);
  }

  getIdValue(event) {
    console.log(event);
    this.onSelectElement.emit(event);
  }

}
