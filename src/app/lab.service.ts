import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import { Cell } from './cell'

@Injectable()
export class Lab {
    server: string = "http://localhost:8081";
    // experiments: { [id: string] : void; } = {}

    constructor(private http: Http) { }

    newExperiment(width, height, seed) {
        const req = {Dims: {Width: width, Height: height}, Pattern: 0, Seed: seed}
        // this.http.post(this.server+"/analyze", JSON.stringify(req)).subscribe(callback)
        return this.http.post(this.server+"/analyze", JSON.stringify(req))
                .map((res: Response) => res.json())
        // .catch()
    }

    poll(id, startingGen, maxGen) {
        const req = {"Id": id, "StartingGeneration": startingGen, "NumMaxGenerations": maxGen}
        return this.http.post(this.server+"/poll", JSON.stringify(req))
                .map((res: Response) => res.json())
    }

    control(id, order) {
        return this.http.post(this.server+"/control", JSON.stringify({"Id": id, "Order": order}))
    }
}
