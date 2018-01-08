import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
    moduleId: module.id,
    selector: 'addin',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    private RootUrl = 'https://api.finbourne.com';
    private IssuerIdUrl = 'https://lusid.okta.com/oauth2/aus5al5yopbHW2wJn2p6';
    private ClientId = '0oa5al4bjt4whCMht2p6';
    private BaseUrl = 'https://api-am-prod.finbourne.com/v1/api';
    title: string = 'Finbourne Excel Plugin!';

    constructor(private CookieService: CookieService) { }
    

    ngOnInit()
    {
        this.CookieService.put("AppComponent", "I'm in!");
    }
}
