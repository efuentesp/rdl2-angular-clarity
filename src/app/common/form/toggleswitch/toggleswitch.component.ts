import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControlName } from "@angular/forms";

@Component({
  selector: "app-toggleswitch",
  templateUrl: "./toggleswitch.component.html",
  styleUrls: ["./toggleswitch.component.scss"]
})
export class ToggleswitchComponent implements OnInit {
  constructor() {}

  @Input() id: string = "";
  @Input() required: boolean = true;
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