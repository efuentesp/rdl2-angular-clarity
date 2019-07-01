import { Component, OnInit, Input } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formbox',
  templateUrl: './formbox.component.html',
  styleUrls: ['./formbox.component.css']
})
export class FormboxComponent implements OnInit {

  constructor(
    
  ) { 
   
  }

  

  @Input()
  layout: string;
  @Input()
  name: string;
  @Input()
  type: string;
  @Input()
  _formGroup: FormGroup;

  ngOnInit() {
  }

  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  validateDemo() {
    this.validateBtnState = ClrLoadingState.LOADING;
    //Validating Logic
    this.validateBtnState = ClrLoadingState.SUCCESS;
  }

  submitDemo() {
    this.submitBtnState = ClrLoadingState.LOADING;
    //Submit Logic
    this.submitBtnState = ClrLoadingState.DEFAULT;
  }

}
