/* AppComponent.ts
 * Authenticate and
 * Sets up Common header and common nav in the app */
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
    moduleId: module.id,
    selector: 'addin',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    title: string = 'Excel Plugin';
    navRoutes: Object[] = [
        { path: '/OfficeInteraction', title: 'Office interaction page' },
        { path: '/Portfolios', title: 'Portfolios' },
        { path: '/Overview', title: 'Overview' }];

    constructor(private readonly CookieService: CookieService) { }

    /**
     * Authenticate with Okta and store token as cookie in the browser
     */
    ngOnInit()
    {
        this.CookieService.put("AppComponent", "I'm in!");
    }
}
