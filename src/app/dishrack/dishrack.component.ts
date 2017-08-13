import { Component, OnInit } from '@angular/core';

import { Lab } from '../lab.service';
import { Cell } from '../cell'

@Component({
  selector: 'dishrack',
  templateUrl: './dishrack.component.html',
  styleUrls: ['./dishrack.component.css']
})
export class DishrackComponent implements OnInit {
    constructor(lab: Lab) { }

    ngOnInit() {
    }
}
