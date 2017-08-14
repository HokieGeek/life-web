import { Component, OnInit } from '@angular/core';

import { Lab } from '../lab.service';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
    constructor(lab: Lab) {
    }

    ngOnInit() {
    }

    create() {
        console.log("TODO: create a new petridish")
        // this.lab.newExperiment()
    }
}
