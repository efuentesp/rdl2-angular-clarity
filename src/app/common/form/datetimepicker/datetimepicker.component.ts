import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControlName } from "@angular/forms";

@Component({
  selector: "app-datetimepicker",
  templateUrl: "./datetimepicker.component.html",
  styleUrls: ["./datetimepicker.component.scss"],
})
export class DatetimepickerComponent implements OnInit {
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

  hours: Array<{ id: string; value: string }> = [];
  minutes: Array<{ id: string; value: string }> = [];

  ngOnInit() {
    this.getTime();
  }

  getTime() {
    for (var i = 1; i < 24; i++) {
      let hour = this.pad(i, 2);
      this.hours.push({ id: hour, value: hour });
    }

    for (var i = 1; i < 60; i++) {
      let minute = this.pad(i, 2);
      this.minutes.push({ id: minute, value: minute });
    }
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
