import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { ApiService } from './apiService';
import { CookieModule } from 'ngx-cookie';

@Component({
    moduleId: module.id,
    templateUrl: 'overview.html',
   
})

export class OverviewComponent implements OnInit  {
    
    title: string = "Overview";
    description: string = 'This is a Finbourne innovation';

    details: Object[] = [
        {
            route: '/office',
            title: 'Office'
        },
        {
            route: '/Portfolios',
            title: 'All Portfolios'
        }
    ];

    constructor(private CookieService: CookieService) {

    }

    ngOnInit() {
        this.CookieService.put("OverviewComponent", "I'm in!");
    }
    
}