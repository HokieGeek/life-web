import { Component, OnInit } from '@angular/core';

import { Lab } from '../lab.service';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
    constructor(private lab: Lab) { }

    ngOnInit() { }

    create() {
        this.lab.newExperiment()
    }
}
