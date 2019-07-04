import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName, ControlValueAccessor } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-outputbox',
  templateUrl: './outputbox.component.html'
})
export class OutputboxComponent implements OnInit {

  constructor() { }


  @Input() required: boolean = true;
  @Input() type: string = ''
  @Input() label: string;
  @Input() help: string = '';
  @Input() placeholder: string = '';
  @Input() error: string = '';
  @Input() hidden: boolean = false;
  @Input() disabled: boolean = false;
  @Input() linecount: number = 0;

  @Input() _formGroup: FormGroup;
  @Input() _formControlName: FormControlName;
  @Input() value: string;
  @Input() id: string;



  ngOnInit() {

  }



}
