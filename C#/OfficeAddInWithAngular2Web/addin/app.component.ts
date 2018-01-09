import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
    moduleId: module.id,
    selector: 'addin',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit
{
    title: string = 'Excel Plugin';
    navRoutes: Object[] = [{ path: '/OfficeInteraction', title: 'Office interaction page' },
        { path: '/Portfolios', title: 'Portfolios' },
        { path: '/Overview', title: 'Overview' }];

    constructor(private readonly CookieService: CookieService) { }
    
    ngOnInit()
    {
        this.CookieService.put("AppComponent", "I'm in!");
    }
}
