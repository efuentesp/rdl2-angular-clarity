import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.css']
})
export class InputboxComponent implements OnInit {

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
  @Input() flag: boolean = false;
  @Output() showModal = new EventEmitter<boolean>();

  ngOnInit() {
  }

  openModal() {

    this.flag = true;
    this.showModal.emit(this.flag);

  }

}
