﻿import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { ApiService } from '../apiService';

@Component({
    moduleId: module.id,
    templateUrl: 'overview.html',
   
})

export class OverviewComponent implements OnInit  {    
    Title: string = 'Overview';
    Description: string = 'Overview page';

    constructor(private CookieService: CookieService,
                private ApiService: ApiService) { }

    ngOnInit() {
        this.CookieService.put("OverviewComponent", "I'm in!");
    }
    
}