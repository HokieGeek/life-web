import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Cell } from './cell'

@Injectable()
export class Lab {
    server: string = "http://localhost:8081";
    // experiments: { [id: string] : void; } = {}

    constructor(private http: Http) { }

    newExperiment(width, height, seed, callback) {
        const req = {Dims: {Width: 100, Height: 50}, Pattern: 0, Seed: [{X: 0, Y: 0}]}
        this.http.post(this.server+"/analyze", JSON.stringify(req)).subscribe(callback)
    }

    dummySeed() {
        var dummy = []
        for (var row = 99; row >= 0; row--) {
            for (var col = 149; col >= 0; col--) {
                dummy.push(new Cell(col, row));
            }
        }
        return dummy
    }
}
