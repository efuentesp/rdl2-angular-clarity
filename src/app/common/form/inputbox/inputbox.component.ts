import { Component, OnInit, Input } from '@angular/core';
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

  ngOnInit() { }

  // validateNumber(e: any) {
  //   let input = String.fromCharCode(e.charCode);
  //   const reg = /^\d*(?:[.,]\d{2})?$/;
  //   if (!reg.test(input)) {
  //     e.preventDefault();
  //   }
  // }

  // fillDecimals(e: any, length) {
  //   console.log('Fill Decimals');
  //   let input = String.fromCharCode(e.charCode);

  //   var str = input + "";
  //   var dot = str.lastIndexOf('.');
  //   var isDecimal = dot != -1;
  //   var integer = isDecimal ? str.substr(0, dot) : str;
  //   var decimals = isDecimal ? str.substr(dot + 1) : "";
  //   decimals = this.pad(decimals, length, 0);
  //   return integer + '.' + decimals;
  // }

  // pad(input, length, padding) {
  //   var str = input + "";
  //   return (length <= str.length) ? str : this.pad(str + padding, length, padding);
  // }

  // pad(num: number, size: number): string {
  //   let s = num + "";
  //   while (s.length < size) s = "0" + s;
  //   return s;
  // }

}
