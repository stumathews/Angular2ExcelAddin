import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.css']
})

export class OverviewComponent {
    title: string = "Overview";
    description: string = 'This is a Finbourne innovation';

    details: Object[] = [
        {
            route: '/office',
            title: 'Home'
        }
    ];

    constructor() {
    }
}