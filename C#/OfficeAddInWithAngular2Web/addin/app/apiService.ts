import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EntityTypes } from './Models/EntityTypes';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { LoginData } from './Models/LoginData';
import { ListPortfolioRootsResponse } from '@finbourne/lusidtypes';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch';



@Injectable()
export class ApiService {

    private RootUrl = 'https://api.finbourne.com';
    private IssuerIdUrl = 'https://lusid.okta.com/oauth2/aus5al5yopbHW2wJn2p6';
    private AuthorizationUrl = 'https://lusid.okta.com/oauth2/aus5al5yopbHW2wJn2p6/v1/authorize';
    private ClientId = '0oa5al4bjt4whCMht2p6';
    private BaseUrl = 'https://api-am-prod.finbourne.com/v1/api';
    private AggregationUrlEndpoint = this.BaseUrl + '/aggregation';
    private AnalyticsUrlEndpoint = this.BaseUrl + '/analytics';
    private MetadataUrlEndpoint = this.BaseUrl + '/metadata';
    private ClassificationsUrlEndpoint = this.BaseUrl + '/classifications';
    private ExcelAddinUrlEndpoint = this.BaseUrl + '/excel';
    private HealthUrlEndpoint = this.BaseUrl + '/health';
    private LoginUrlEndpoint = this.BaseUrl + '/login';
    private LogsUrlEndpoint = this.BaseUrl + '/logs';
    private PersonalisationUrlEndpoint = this.BaseUrl + '/personalisations';
    private PortfolioGroupsUrlEndpoint = this.BaseUrl + '/groups/portfolios';
    private PortfoliosUrlEndpoint = this.BaseUrl + '/portfolios';
    private GetAllPortfoliosUrl = this.PortfoliosUrlEndpoint + '/{scope}';
    private PropertiesUrlEndpoint = this.BaseUrl + '/properties';
    private PropertyDataFormatUrlEndpoint = this.BaseUrl + '/propertyformats';
    private ReferencePortfoliosUrlEndpoint = this.BaseUrl + '/reference';
    private ResultsUrlEndpoint = this.BaseUrl + '/result';
    private SearchProxyUrlEndpoint = this.BaseUrl + '/properties/search';

    private ExcelLatestVersionUrl = this.ExcelAddinUrlEndpoint + '/latest-version';
    
    constructor(private http: Http, private _router: Router, private _cookieService: CookieService) { }
    
    obtainAccessToken(loginData: LoginData) {
        let params = new URLSearchParams();
        params.append('username', loginData.username);
        params.append('password', loginData.password);
        params.append('grant_type', 'implicit');
        params.append('client_id', this.ClientId);
        let headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + btoa("fooClientIdPassword:secret") });
        let options = new RequestOptions({ headers: headers });

        this.http.post(this.AuthorizationUrl, params.toString(), options)
            .map(res => res.json())
            .subscribe(
                data => this.saveToken(data),
                err => alert('Invalid Credentials'));
    }

    saveToken(token: any) {
        var expireDate = new Date().getTime() + (1000 * token.expires_in);
        var options: CookieOptions = { expires: new Date(expireDate) };
        this._cookieService.put("access_token", token.access_token, options );
        //Cookie.set("access_token", token.access_token, expireDate);
        this._router.navigate(['/']);
    }

    getResource(resourceUrl: string): Observable<ListPortfolioRootsResponse> {
        var access_token = this._cookieService.get('access_token'); //Cookie.get('access_token');
        var headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer ' + access_token });
        var options = new RequestOptions({ headers: headers });
        return this.http.get(resourceUrl, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    checkCredentials() {
        //if (!Cookie.check('access_token')) {
            this._router.navigate(['/login']);
        //}
    }

    logout() {
        //Cookie.delete('access_token');
        this._cookieService.remove('access_token');
        this._router.navigate(['/login']);
    }
    
    // GET one
    GetLatestExcelAddinVersion(): Observable<any> {
        return this.http.get(this.ExcelLatestVersionUrl)
            .map((response: Response) => <number>response.json())
            .do((data: number) => console.log('ExcelLatestVersionUrl: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'server error');
    }


    /*
    // POST
    GetInvestmentGraphData(type: EntityTypes, investmentID: number): Observable<any> {

        let url;

        if (type === EntityTypes) {
            url = this.anysGraphUrl;
        } else if (type === EntityTypes.any) {
            url = this.InvestmentFactorsGraphUrl;
        } else if (type === EntityTypes.any) {
            url = this.anysGraphUrl;
        } else if (type === EntityTypes.Region) {
            url = this.InvestmentRegionsGraphUrl;
        }

        url = url.replace('{id}', investmentID);
        console.log('Getting data for...' + EntityTypes[type]);
        return this.http.post(url, {})
            .map((response: Response) => <any[] > response.json())
            .do((data => console.log('All: ' + JSON.stringify(data))))
            .catch(this.handleError);
    }
    
    // GET many
    GetlatestExcelAddminVersionqqq(): Observable<any[]> {
        console.log('Getting latest excel admin version...');
        return this.http.get(this.ExcelLatestVersionUrl)
            .map((response: Response) => <any[]> response.json())
            .do((data => console.log('All: ' + JSON.stringify(data))))
            .catch(this.handleError);
    }
    */
    
    /*
    // POST with URL paramters
    AssociateEntityWithInvestment(entityType: EntityTypes, entityIDs: number[], investmentId: number): Observable<any> {
                                                    console.log('Entity=' + EntityTypes[entityType] +
                                                        ' AssociateEntityWithInvestment ids=' + entityIDs.join(',') +
                                                        ' investmentID=' + investmentId);
                                                    let url;
        if (entityType === EntityTypes.any) {
                                                        url = this.AssociateFactorWithInvestmentUrl;
                                                    } else if (entityType === EntityTypes.any) {
                                                        url = this.AssociateRiskWithInvestmentUrl;
                                                    } else if (entityType === EntityTypes.any) {
                                                        url = this.AssociateGroupWithInvestmentUrl;
                                                    } else if (entityType === EntityTypes.Region) {
                                                        url = this.AssociateRegionWithInvestmentUrl;
                                                    }

        console.log('url is ' + url);
        url = url.replace('{investmentID}', '' + investmentId);
        return this.http.post(url, entityIDs)
        .map((response: Response) => <any|null>response.json())
        .do((data => console.log('AssociateEntityFromInvestment: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }

    // DELETE

    DeleteEntity(entityType: EntityTypes, id: number): Observable<any>  {
                                                                                                    let mapFunction;
        let url;

        if (entityType === EntityTypes.Investment) {
            url = this.InvestmentByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <any>response.json();
        } else if (entityType === EntityTypes.any) {
            url = this.FactorByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <any>response.json();
        } else if (entityType === EntityTypes.any) {
            url = this.RiskByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <any>response.json();
        } else if (entityType === EntityTypes.any) {
            url = this.GroupByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <any>response.json();
        } else if (entityType === EntityTypes.Region) {
            url = this.RegionByIdUrlEndpoint.replace('{id}', '' + id);
            mapFunction = (response: Response) => <Region>response.json();
        }

        console.log('Delete entity via url:' + url);
        return this.http.delete(url).map(mapFunction)
        .do((data => console.log('do DeleteEntity: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }

    // PATCH
    UpdateEntity(entityType: EntityTypes, id: number, property: string, value: any): Observable<number> {
        const patchObj = [{
                                                                                                                                'value': value,
            'path': '/' + property,
            'op': 'replace'
        }];
        let url;

        console.log('Patch for Entity' + EntityTypes[entityType] + ' patch is : ' + JSON.stringify(patchObj));

        const headers = new Headers({'Content-Type': 'application/json' });
        const options = new RequestOptions({headers: headers }); // Create a request option

        if (entityType === EntityTypes.Investment) {
                url = this.InvestmentByIdUrlEndpoint.replace('{id}', '' + id);
            } else if (entityType === EntityTypes.any) {
                url = this.FactorByIdUrlEndpoint.replace('{id}', '' + id);
            } else if (entityType === EntityTypes.any) {
                url = this.RiskByIdUrlEndpoint.replace('{id}', '' + id);
            } else if (entityType === EntityTypes.any) {
                url = this.GroupByIdUrlEndpoint.replace('{id}', '' + id);
            } else if (entityType === EntityTypes.Region) {
                url = this.RegionByIdUrlEndpoint.replace('{id}', '' + id);
            }

        return this.http.patch(url, patchObj, options)
        .map((response: Response) => <number>response.json(), (error: any) => {})
        .do((data => console.log('do patch risk: ' + JSON.stringify(data))))
        .catch(this.handleError);
    }
    */

    
}