import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { ApiService } from './app/apiService';

@Component({
    moduleId: module.id,
    selector: 'addin',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    title: string = 'Finbourne Excel Plugin!';
    details: Object[] = [
        { route: '/office', title: 'Office' },
        { route: '/Portfolios', title: 'All Portfolios' }];
    
    private RootUrl = 'https://api.finbourne.com';
    private IssuerIdUrl = 'https://lusid.okta.com/oauth2/aus5al5yopbHW2wJn2p6';
    private ClientId = '0oa5al4bjt4whCMht2p6';
    private BaseUrl = 'https://api-am-prod.finbourne.com/v1/api';    
    private AuthUrlTmpl = this.IssuerIdUrl + '/v1/authorize?client_id={clientId}&response_type={responseType}&scope={scope}&redirect_uri={redirectUrl}&state={state}1&nonce={nonce}';

    constructor(private CookieService: CookieService,
                private ApiService: ApiService) { }
    
    ngOnInit()
    {
        const responseType = 'token';
        const redirect_uri = 'https%3A%2F%2Flocalhost%3A44346';
        const state = 'fuzzybird';
        const nonce = 'nonce';        
        const scope = 'openid'
                
        const url = this.AuthUrlTmpl
            .replace('{clientId}', this.ClientId)
            .replace('{responseType}', responseType)
            .replace('{redirectUrl}', encodeURI(redirect_uri))
            .replace('{scope}', scope)
            .replace('{state}', state)
            .replace('{nonce}', nonce);
      
        /*
        this.ApiService.ObtainAuthorizationGrantfromUser(url).subscribe((value: any) => { console.log('Received:' + JSON.stringify(value)); }, error => {
            console.log('Received error: ' + error); });
        this.CookieService.put("AppComponent", "I'm in!"); */
    }
}
