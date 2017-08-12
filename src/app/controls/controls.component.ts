import { Component, OnInit } from '@angular/core';

import { Lab } from '../lab.service';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
    private lab: Lab

    constructor(lab: Lab) {
        this.lab = lab
    }

    ngOnInit() {
    }

    create() {
        this.lab.newExperiment()
    }
}
