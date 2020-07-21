import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-begin",
  templateUrl: "./begin.component.html",
  styles: [],
})
export class BeginComponent implements OnInit {
  year = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
