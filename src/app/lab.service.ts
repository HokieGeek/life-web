import { Injectable } from '@angular/core';

@Injectable()
export class Lab {
    server: string = "http://localhost:8081";
    // experiments: { [id: string] : void; } = {}

    constructor() { }

    newExperiment() {
        console.log("TODO: new experiment")
        // TODO: deal with callback
        // $.post(server+"/analyze", JSON.stringify(req))
        //     .done(callback)
        //     .fail(function(err) {
        //         console.log("Got a post error:", err.status, err.responseText);
        //     });
    }
}
