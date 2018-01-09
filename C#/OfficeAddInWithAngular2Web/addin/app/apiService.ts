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

           
    //Aggregate data from a result set          
    private AggregateFromResultUrl = this.AggregationUrlEndpoint + '/results/{scope}/{resultsKey}/{resultsDate}';
    // Aggregate data from a result set into a nested structure            
    private AggregatefromResultIntoNested = this.AggregationUrlEndpoint + '/results/nested/{scope}/{resultsKey}/{resultsDate}';
    // Aggregate data in a group hierarchy                
    private AggregateInGroupHierachy = this.AggregationUrlEndpoint + '/groups/{scope}/{groupName}';
    // Aggregation request data in a group hierarchy into a data tree           
    private AggregateInGroupHierachyTree = this.AggregationUrlEndpoint + '/groups/nested/{scope}/{groupName}';
    // Aggregate data in a portfolio                 
    private AggregatePorfolio= this.AggregationUrlEndpoint + '/portfolios/{scope}/{portfolioId}';
    // Aggregation request data in a portfolio into a data tree 
    private AggregateportfolioTree = this.AggregationUrlEndpoint + '/portfolios/nested/{scope}/{portfolioId}';

    /*
    Create a new analytic store for the given scope for the given date         		DeletedEntityResponse, IErrorResponse	/v1/api/analytics/{scope}/{date}
GetAnalyticStore                  		GetAnalyticStoreResponse	/v1/api/analytics/{scope}/{date}
ListAnalyticStores                		IErrorResponse	/v1/api/analytics
CreateAnalyticStore         		CreateAnalyticStoreResponse, IErrorResponse	/v1/api/analytics/{scope}/{date}
InsertAnalytics         	SecurityAnalyticData	IErrorResponse	/v1/api/analytics/{scope}/{date}/prices

GetCurrentAssemblyVersion                 			/v1/api/metadata/version
GetCurrenBuildVersion                 			/v1/api/metadata/buildversion
GetCurrentConnectivity                			/v1/api/metadata/verifyconnectivity

Update classification data                   	SecurityClassificationData[]		/v1/api/classifications

                     			/v1/api/excel/latest-version
                     			/v1/api/excel/download-token

Simple heartbeat method for the api                			/v1/api/health

Gets the login information.                  			/v1/api/login

Store a log message                  	WebLogMessage		/v1/api/logs/lusidweb

Delete a personalisation at a specific scope (or use scope ALL to purge the setting entirely)      			/v1/api/personalisations
Get a personalisation, recursing to get any referenced if required.            			/v1/api/personalisations
Upsert one or more personalisations                 	Personalisation[]		/v1/api/personalisations

Delete a group                   			/v1/api/groups/portfolios/{scope}/{groupId}
Remove a portfolio that is currently present within an existing group           			/v1/api/groups/portfolios/{scope}/{groupId}/portfolios/{portfolioScope}/{portfolioId}
Remove a subgroup that is currently present within an existing group           			/v1/api/groups/portfolios/{scope}/{groupId}/subgroups/{subgroupScope}/{subgroupId}
List all groups in a specified scope               			/v1/api/groups/portfolios/{scope}
Get an existing group                  			/v1/api/groups/portfolios/{scope}/{groupId}
Lookups a portfolio group.                  			/v1/api/groups/portfolios/{scope}/lookup/{groupName}
Create a new group                  	PortfolioGroupState		/v1/api/groups/portfolios/{scope}
Update an existing group                  	PortfolioGroupState		/v1/api/groups/portfolios/{scope}/{groupId}/update
Add a portfolio to an existing group               	ScopedIdentifier		/v1/api/groups/portfolios/{scope}/{groupId}/portfolios
Add a sub group to an existing group              	ScopedIdentifier		/v1/api/groups/portfolios/{scope}/{groupId}/subgroups

Delete the details from a portfolio                			/v1/api/portfolios/{scope}/{portfolioId}/details
Delete a property from a portfolio                			/v1/api/portfolios/{scope}/{portfolioId}/properties
Delete one or more trades from a portfolio              			/v1/api/portfolios/{scope}/{portfolioId}/trades
Delete a specific portfolio                  			/v1/api/portfolios/{scope}/{portfolioId}
Delete a property from a specific trade               			/v1/api/portfolios/{scope}/{portfolioId}/trades/{tradeId}/properties
Delete one or more properties from the collection of portfolio properties           			/v1/api/portfolios/{scope}/{portfolioId}/properties/all
Get all portfolios in a scope                		ListPortfolioRootsResponse, IErrorResponse	/v1/api/portfolios/{scope}
Get a specific portfolio                  		GetPortfolioRootResponse	/v1/api/portfolios/{scope}/{portfolioId}/root
Get a specific portfolio's details                 		GetPortfolioRootResponse	/v1/api/portfolios/{scope}/{portfolioId}/details
Get the properties from a portfolio                		GetPortfolioRootResponse	/v1/api/portfolios/{scope}/{portfolioId}/properties
Get all the trades in a portfolio               		GetPortfolioTradesResponse, IErrorResponse	/v1/api/portfolios/{scope}/{portfolioId}/trades
Look up a portfolio by its name               		LookupPortfolioRootResponse	/v1/api/portfolios/{scope}/lookup/{name}
Get the version information for the latest version of the portfolio           			/v1/api/portfolios/{scope}/{portfolioId}/versions/latest
Get the version information for a portfolio at a specific date           			/v1/api/portfolios/{scope}/{portfolioId}/versions/at
Get version information for all versions of a specific portfolio            			/v1/api/portfolios/{scope}/{portfolioId}/versions
Get the aggregate holdings of a portfolio TODO: This should be deprecated and all usages replaced with a call to the AggregationService			/v1/api/portfolios/{scope}/{portfolioId}/holdings
Create a new portfolio                  	CreatePortfolioRequest	GetPortfolioRootResponse	/v1/api/portfolios/{scope}
Create a portfolio that derives from an existing portfolio             	Portfolio	GetPortfolioRootResponse	/v1/api/portfolios/{scope}/derived
Update the details of a specific portfolio               	Portfolio		/v1/api/portfolios/{scope}/{portfolioId}/root
Add/update details to a portfolio                 	PortfolioDetails	GetPortfolioDetailsResponse	/v1/api/portfolios/{scope}/{portfolioId}/details
Create one or more properties in a portfolio              	Property[]		/v1/api/portfolios/{scope}/{portfolioId}/properties
Add trades to a specific portfolio                	Trade[]		/v1/api/portfolios/{scope}/{portfolioId}/trades
Set the trades in a portfolio between two dates.             	Trade[]		/v1/api/portfolios/{scope}/{portfolioId}/trades/set
Create trades in a specific portfolio to bring it to the specified holdings         	Holding[]		/v1/api/portfolios/{scope}/{portfolioId}/holdings/{effectiveDate}
Add one or more properties to a specific trade in a portfolio          	Property[]		/v1/api/portfolios/{scope}/{portfolioId}/trades/{tradeId}/properties
Add one or more properties to all trades in a portfolio           	Property[]		/v1/api/portfolios/{scope}/{portfolioId}/trades/properties
Replace the portfolio state with that of a previous version            			/v1/api/portfolios/{scope}/{portfolioId}/versions/{version}/copy

Deletes the property definition.                  			/v1/api/properties/{domain}/{scope}/{name}
Gets the available property-definition domains.                 			/v1/api/properties
Gets a property definition.                  			/v1/api/properties/{domain}/{scope}/{name}
Gets multiple property definitions.                  			/v1/api/properties/{domain}/_keys
Gets all available property definitions.                 			/v1/api/properties/{domain}
Gets the available property-definition scopes for the specified domain.             			/v1/api/properties/{domain}/_scopes
Gets all properties in a scope.                			/v1/api/properties/{domain}/{scope}
Creates a new property definition.                 	PropertyDefinition		/v1/api/properties
Updates the specified property definition.                 	PropertyDefinition		/v1/api/properties

Gets a property data format.                 			/v1/api/propertyformats/{scope}/{name}
Lists all property data formats in the specified scope.             			/v1/api/propertyformats/{scope}
Upsert a new PropertyDataFormat. Note: Only non-default formats can be created/updated.           			/v1/api/propertyformats/{type}

Delete a specific portfolio                  			/v1/api/reference/{scope}/{portfolioId}
Get all reference portfolios in a scope               		ListPortfolioRootsResponse	/v1/api/reference/{scope}
Get all the constituents in a reference portfolio              		ReferencePortfolioConstituentsResponse	/v1/api/reference/{scope}/{referencePortfolioId}/{effectiveDate}/constituents
Get a reference portfolio by name (as opposed to id)            		ReferencePortfolioConstituentsResponse	/v1/api/reference/{scope}/lookup/{name}
Create a new reference portfolio                 	Portfolio	ReferencePortfolioResponse	/v1/api/reference/{scope}
Add constituents to a specific reference portfolio               	ReferencePortfolioConstituent[]		/v1/api/reference/{scope}/{referencePortfolioId}/{effectiveDate}/constituents

Retrieve some previously stored results                 			/v1/api/results/{scope}/{key}/{date}
Upsert precalculated results against a specified scope/key/date combination              	InsertResultsRequest	CreateAnalyticStoreResponse	/v1/api/results/{scope}/{key}/{date}

Gets the schema for a given entity.               			/v1/api/schema/entities/{entity}

Search property definitions                   			/v1/api/properties/search

Lookup an individual security by supplying a standard market-identifier code (e.g. ISIN).          			/v1/api/securities/lookup/{codeType}/{code}
Lookup more than one security by supplying a collection of non-Finbourne codes.          	string[]		/v1/api/securities/lookup/{codeType}
Attempt to delete one or more client securities. Failed securities will be identified in the body of the response.   			/v1/api/securities
Attempt to create one or more client securities. Failed securities will be identified in the body of the response.   	ClientSecurityDefinitionData[]		/v1/api/securities

    */
    
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

    ObtainAuthorizationGrantfromUser(AuthorizationUrl: string): Observable<any> {
        console.log('Enter: ObtainAuthorizationGrantfromUser Url=' + AuthorizationUrl);
        return this.http.get(this.AuthorizationUrl)
            .map((response: Response) => <number>response.json())
            .do((data: number) => console.log('ObtainAuthorizationGrantfromUser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
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