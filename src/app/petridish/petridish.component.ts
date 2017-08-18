import { Component, OnInit, ViewChild, Input } from '@angular/core';
import 'rxjs/Rx'

import { Generation, Experiment } from '../lab.service'
import { Cell } from '../cell'

/*
Petridish's reason to be is to provide controls and a viewer to the timline structure
*/

@Component({
  selector: 'petridish',
  templateUrl: './petridish.component.html',
  styleUrls: ['./petridish.component.css']
})
export class PetridishComponent implements OnInit {
    private playing: boolean = false
    private creating: boolean = true
    cellSize: number = 3
    cellSpacing: number = 1
    playRateMs: number = 100

    @Input() experiment: Experiment
    currentGeneration: number = 0

    constructor() { }

    ngOnInit() {
        this.createSeed()
        setInterval(() => {
                if (this.playing) {
                    this.nav('+', 1)
                }
            }, this.playRateMs)

        if (this.experiment.autoStart) {
            this.analyze()
        }
    }

    ngOnDestroy() {
        console.log("buh bye!")
        this.experiment.incinerate()
    }

    destroy() {
        console.log("TODO: destroy!")
        this.experiment.incinerate()
    }

    createSeed() {
        this.experiment.seed = new Generation(0, "Creating", this.generateSeed())
    }

    generateSeed() {
        var seed = []
        for (var row = this.experiment.rows-1; row >= 0; row--) {
            for (var col = this.experiment.columns-1; col >= 0; col--) {
                var randomVal = Math.random() * 100
                if (randomVal > this.experiment.initialDensity) continue
                seed.push(new Cell(col, row))
            }
        }
        return seed
    }

    analyze() {
        this.creating = false
        this.playing = true
        this.experiment.start()
    }

    getCurrentGeneration() {
        return this.experiment.get(this.currentGeneration)
    }

    togglePlaying() {
        this.playing = !this.playing
    }

    nav(direction, step) {
        // TODO: only perform navigation if experiment can go that far...
        if (direction == '+') {
            this.currentGeneration += step
        } else if (direction == '-') {
            this.currentGeneration -= step
        }
    }
}
