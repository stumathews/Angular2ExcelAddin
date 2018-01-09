import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'test.html',
    styleUrls: ['test.css']
})

export class TestUiComponent {    
    constructor() { }

    myTestFunction() : Promise<any>
    {
        return new Promise(function (resolve, reject) {
            resolve('');
            reject('');
        });
    }

    myTestFunctionAgain() {        
        // this will return immediately
        this.myTestFunction().then((value: any) => {
            // attach this call back via .then which will execute when the promise is resolved.
            // call this call back when the function does finishes
        }, (reason) => {
            // the reason why it didnt work.
        });
    }
}