import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {

  @Input() vin!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
