import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Cell } from './cell'

@Injectable()
export class Lab {
    server: string = "http://localhost:8081";
    // experiments: { [id: string] : void; } = {}

    constructor(private http: Http) { }

    newExperiment() {
        console.log("TODO: new experiment")
        // TODO: deal with callback
        this.http.post(this.server+"/analyze",
            {"Dims": {"Width": 150, "Height": 100}, "Pattern": 0, "Seed": this.dummySeed})
                .subscribe(data => { console.log("POST CALLBACK", data) })
    }

    dummySeed() {
        var dummy = []
        for (var row = 99; row >= 0; row--) {
            for (var col = 149; col >= 0; col--) {
                // if (row % 2 == 0 && col % 2 != 0) {
                // if (row % 2 == 0) {
                    dummy.push(new Cell(col, row));
                // }
            }
        }
        return dummy
    }
}
