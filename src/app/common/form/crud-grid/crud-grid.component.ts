import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  FormControlName
} from "@angular/forms";

@Component({
  selector: "app-crud-grid",
  templateUrl: "./crud-grid.component.html",
  styleUrls: ["./crud-grid.component.scss"]
})
export class CrudGridComponent implements OnInit {
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
  @Input() flag: boolean = false;
  @Input() minlength: number = 0;
  @Input() maxlength: number = 0;
  @Input() delete: boolean = false;

  @Output() onAddElement = new EventEmitter<string>();
  @Output() onDeleteElement = new EventEmitter<string>();

  @Input() isDialogOpen: boolean = false;
  @Input() items: any[];
  @Input() baseEntity: any;
  @Input() headers: any[];
  @Input() attrs: string[];

  ngOnInit() {}

  addElement() {
    this.onAddElement.emit();
  }

  deleteElement(index) {
    this.onDeleteElement.emit(index);
  }
}
