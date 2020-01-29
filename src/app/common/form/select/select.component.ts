import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControlName } from "@angular/forms";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"]
})
export class SelectComponent implements OnInit {
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
  @Input() items: any[];
  @Input() _formGroup: FormGroup;
  @Input() _formControlName: FormControlName;

  ngOnInit() {}
}
