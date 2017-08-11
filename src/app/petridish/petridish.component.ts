import { Component, OnInit } from '@angular/core';

import { Lab } from '../lab.service';

@Component({
  selector: 'petridish',
  templateUrl: './petridish.component.html',
  styleUrls: ['./petridish.component.css']
})
export class PetridishComponent implements OnInit {

    constructor(lab: Lab) {
    }

    ngOnInit() {
    }

}
