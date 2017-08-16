import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Cell } from '../../cell'
import { Generation } from '../../lab.service'

@Component({
  selector: 'culture-info',
  templateUrl: './culture-info.component.html',
  styleUrls: ['./culture-info.component.css']
})
export class CultureInfoComponent implements OnInit {
    @Output() close:EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() generation: Generation
    @Input() boardWidth: number
    @Input() boardHeight: number
    // @Input startTime: ??

    constructor() {
    }

    ngOnInit() {
    }
}
