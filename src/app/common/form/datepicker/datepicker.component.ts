import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControlName } from "@angular/forms";

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.scss"]
})
export class DatepickerComponent implements OnInit {
  constructor() {}

  @Input() id: string = "";
  @Input() required: boolean = true;
  @Input() type: string = "";
  @Input() label: string = "";
  @Input() help: string = "";
  @Input() placeholder: string = "";
  @Input() error: string = "";
  @Input() hidden: boolean = false;
  @Input() disabled: boolean = false;
  @Input() linecount: number = 0;
  @Input() _formGroup: FormGroup;
  @Input() _formControlName: FormControlName;

  ngOnInit() {}
}
