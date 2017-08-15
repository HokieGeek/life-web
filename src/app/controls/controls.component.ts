import { Component, OnInit } from '@angular/core';

import { Lab } from '../lab.service';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
    defaultRows: number = 50
    defaultColumns: number = 50
    defaultDensity: number = 60

    constructor(private lab: Lab) { }

    ngOnInit() { }

    create() {
        this.lab.newExperiment(50, 75)
    }
}
