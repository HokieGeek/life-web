import { Component, OnInit } from '@angular/core';

import { Lab } from '../lab.service';

@Component({
  selector: 'petridish',
  templateUrl: './petridish.component.html',
  styleUrls: ['./petridish.component.css']
})
export class PetridishComponent implements OnInit {

    lab: Lab

    constructor(lab: Lab) {
        this.lab = lab
    }

    ngOnInit() {
    }

}
