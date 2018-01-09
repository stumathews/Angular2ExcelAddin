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

    private RootUrl = '';
    private IssuerIdUrl = '';
    private AuthorizationUrl = '';
    private ClientId = '';
    private BaseUrl = '';
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
    private GetAnalyticStore = '/v1/api/analytics/{scope}/{date}';
    private ListAnalyticStores ='/v1/api/analytics';
    private CreateAnalyticStore ='/v1/api/analytics/{scope}/{date}';
    private InsertAnalytics = '/v1/api/analytics/{scope}/{date}/prices';

    private GetCurrentAssemblyVersion ='/v1/api/metadata/version';
    private GetCurrenBuildVersion = '/v1/api/metadata/buildversion';
    private GetCurrentConnectivity = '/v1/api/metadata/verifyconnectivity';

    private UpdateclassificationData = '/v1/api/classifications';

    private GetLatestExcelVersion ='/v1/api/excel/latest-version';
    private GetExcelDownLoadToken = '/v1/api/excel/download-token';

    private GetHealth = '/v1/api/health';

    private GetLoginInfo = '/v1/api/login';

    private StoreLogMessage = '/v1/api/logs/lusidweb';

    private DeletePersonalisation ='/v1/api/personalisations';
    private GetPersonalisation ='/v1/api/personalisations';
    private UpsertPersonalisations = '/v1/api/personalisations';

    private Deletegroup ='/v1/api/groups/portfolios/{scope}/{groupId}';
    private RemovePortfolio ='/v1/api/groups/portfolios/{scope}/{groupId}/portfolios/{portfolioScope}/{portfolioId}';
    private RemoveSubgroup ='/v1/api/groups/portfolios/{scope}/{groupId}/subgroups/{subgroupScope}/{subgroupId}';

    private ListGroups = '/v1/api/groups/portfolios/{scope}';
    private GetGroup ='/v1/api/groups/portfolios/{scope}/{groupId}';
    private LookupsPortfolioGroup ='/v1/api/groups/portfolios/{scope}/lookup/{groupName}';
    private CreateGroup ='/v1/api/groups/portfolios/{scope}';
    private UpdateGroup ='/v1/api/groups/portfolios/{scope}/{groupId}/update';
    private AddportfolioToGroup ='/v1/api/groups/portfolios/{scope}/{groupId}/portfolios';
    private AddSubgroupToPortfolio ='/v1/api/groups/portfolios/{scope}/{groupId}/subgroups';

    private DeletePortfolioDetails = '/v1/api/portfolios/{scope}/{portfolioId}/details';
    private DeletePortfolioProperty ='/v1/api/portfolios/{scope}/{portfolioId}/properties';

    private DeletePortfolioTrades = '/v1/api/portfolios/{scope}/{portfolioId}/trades';
    private DeletePortfolio ='/v1/api/portfolios/{scope}/{portfolioId}';
    private DeleteTradeProperty ='/v1/api/portfolios/{scope}/{portfolioId}/trades/{tradeId}/properties';
    private DeletePortfolios ='/v1/api/portfolios/{scope}/{portfolioId}/properties/all';

    private GetPortfolios = '/v1/api/portfolios/{scope}';
    private GetPortfolio ='/v1/api/portfolios/{scope}/{portfolioId}/root';
    private GetProtfolioDetails ='/v1/api/portfolios/{scope}/{portfolioId}/details';
    private GetPortfolioPrties ='/v1/api/portfolios/{scope}/{portfolioId}/properties';
    private GetPortfolioTrades ='/v1/api/portfolios/{scope}/{portfolioId}/trades';
    private LookPortfolioByName ='/v1/api/portfolios/{scope}/lookup/{name}';

    private GetPortfolioVersion = '/v1/api/portfolios/{scope}/{portfolioId}/versions/latest';
    private GetPortfolioVersionByDate ='/v1/api/portfolios/{scope}/{portfolioId}/versions/at';
    private GetPortfolioVersionAll ='/v1/api/portfolios/{scope}/{portfolioId}/versions';
    private GetPortfolioAggregateHoldings ='/v1/api/portfolios/{scope}/{portfolioId}/holdings';

    private CreatePortfolio = '/v1/api/portfolios/{scope}';
    private CreateDerivedPortfolio ='/v1/api/portfolios/{scope}/derived';
    private UpdatePortfolioDetails ='/v1/api/portfolios/{scope}/{portfolioId}/root';
    private AddupdatePortfolioDetails ='/v1/api/portfolios/{scope}/{portfolioId}/details';
    private CreatePortfolioProperty ='/v1/api/portfolios/{scope}/{portfolioId}/properties';
    private AddPortfolioTrades ='/v1/api/portfolios/{scope}/{portfolioId}/trades';
    private SetPortfolioTradesDate ='/v1/api/portfolios/{scope}/{portfolioId}/trades/set';
    private CreatePortfolioTradesSpecifiedHoldings ='/v1/api/portfolios/{scope}/{portfolioId}/holdings/{effectiveDate}';
    private AddPortfolioTradeProperties ='/v1/api/portfolios/{scope}/{portfolioId}/trades/{tradeId}/properties';
    private AddPortfolioTradePropertyToAllTrade ='/v1/api/portfolios/{scope}/{portfolioId}/trades/properties';
    private RevertPortfolioState ='/v1/api/portfolios/{scope}/{portfolioId}/versions/{version}/copy';

    private DeletePropertyDefinition = '/v1/api/properties/{domain}/{scope}/{name}';
    private GetPropertyDefinitions = '/v1/api/properties';
    private GetPropertyDefinition = '/v1/api/properties/{domain}/{scope}/{name}';
    private GetManyPropertyDefinitions ='/v1/api/properties/{domain}/_keys';
    private GetPropertyDefinitionsByDomain ='/v1/api/properties/{domain}';
    private GetPropertyDefinitionsByDomainScope ='/v1/api/properties/{domain}/_scopes';

    private GetPropertiesByScope = '/v1/api/properties/{domain}/{scope}';
    private CreatePropertyDefinition ='/v1/api/properties';
    private UpdatePropertyDefinition ='/v1/api/properties';

    private GetPropertyDataformat = '/v1/api/propertyformats/{scope}/{name}';
    private GetPropertyDataformatsByScope ='/v1/api/propertyformats/{scope}';
    private UpsertPropertyDataFormat ='/v1/api/propertyformats/{type}';

    private DeleteReferencePortfolio = '/v1/api/reference/{scope}/{portfolioId}';
    private GetReferencePortfoliosByScope ='/v1/api/reference/{scope}';
    private GetReferencePortfolioConstituents ='/v1/api/reference/{scope}/{referencePortfolioId}/{effectiveDate}/constituents';
    private GetRreferencePortfolioByName ='/v1/api/reference/{scope}/lookup/{name}';
    private CreateReferencePortfolio ='/v1/api/reference/{scope}';
    private AddReferencePortfolioConstituents ='/v1/api/reference/{scope}/{referencePortfolioId}/{effectiveDate}/constituents';

    private GetResults = '/v1/api/results/{scope}/{key}/{date}';
    private UpsertResultsByCombination = '/v1/api/results/{scope}/{key}/{date}';

    private GetSchemaForEntity = '/v1/api/schema/entities/{entity}';
    private SearchPropertyDefinitions = '/v1/api/properties/search';

    private LookupSecurityByIsin = '/v1/api/securities/lookup/{codeType}/{code}';
    private LookupSecurities ='/v1/api/securities/lookup/{codeType}';
    private DeleteSecurities ='/v1/api/securities';
    private CreateSecurities ='/v1/api/securities';

    
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