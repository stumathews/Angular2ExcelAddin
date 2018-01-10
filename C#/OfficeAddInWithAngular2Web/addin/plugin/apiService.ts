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

    /* URL Endpoints */
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
    private SearchProxyUrlEndpoint = this.BaseUrl + '/properties/search'; // Not done?
    private SecuritiesUrlEndpoint = this.BaseUrl + '/securities';
    private SchemaUrlEndpoint = this.BaseUrl + '/schema';
           
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

    /* Analytics */
    private GetAnalyticStore =  this.AnalyticsUrlEndpoint + '/{scope}/{date}';
    private ListAnalyticStores = this.AnalyticsUrlEndpoint;
    private CreateAnalyticStore = this.AnalyticsUrlEndpoint + '/{scope}/{date}';
    private InsertAnalytics = this.AnalyticsUrlEndpoint + '/{scope}/{date}/prices';

    /* Metadata */
    private GetCurrentAssemblyVersion = this.MetadataUrlEndpoint + '/version';
    private GetCurrenBuildVersion = this.MetadataUrlEndpoint + '/buildversion';
    private GetCurrentConnectivity = this.MetadataUrlEndpoint + '/verifyconnectivity';

    /* Classification */
    private UpdateclassificationData = this.ClassificationsUrlEndpoint + '';

    /* Excel Addin */
    private GetLatestExcelVersion = this.ExcelAddinUrlEndpoint + '/latest-version';
    private GetExcelDownLoadToken = this.ExcelAddinUrlEndpoint + '/download-token';
    
    /* Health */
    private GetHealth = this.HealthUrlEndpoint + '';

    /* Login */
    private GetLoginInfo = this.LoginUrlEndpoint + '';

    /* Logs */
    private StoreLogMessage = this.LogsUrlEndpoint + '/lusidweb';

    /* Personalisation */
    private DeletePersonalisation = this.PersonalisationUrlEndpoint + '';
    private GetPersonalisation = this.PersonalisationUrlEndpoint + '';
    private UpsertPersonalisations = this.PersonalisationUrlEndpoint + '';

    /* Portfolio Groups */
    private Deletegroup = this.PortfolioGroupsUrlEndpoint + '/{scope}/{groupId}';
    private RemovePortfolio = this.PortfolioGroupsUrlEndpoint + '/{scope}/{groupId}/portfolios/{portfolioScope}/{portfolioId}';
    private RemoveSubgroup = this.PortfolioGroupsUrlEndpoint + '/{scope}/{groupId}/subgroups/{subgroupScope}/{subgroupId}';
    private ListGroups = this.PortfolioGroupsUrlEndpoint + '/{scope}';
    private GetGroup = this.PortfolioGroupsUrlEndpoint + '/{scope}/{groupId}';
    private LookupsPortfolioGroup = this.PortfolioGroupsUrlEndpoint + '/{scope}/lookup/{groupName}';
    private CreateGroup = this.PortfolioGroupsUrlEndpoint + '/{scope}';
    private UpdateGroup = this.PortfolioGroupsUrlEndpoint + '/{scope}/{groupId}/update';
    private AddportfolioToGroup = this.PortfolioGroupsUrlEndpoint + '/{scope}/{groupId}/portfolios';
    private AddSubgroupToPortfolio = this.PortfolioGroupsUrlEndpoint + '/{scope}/{groupId}/subgroups';

    /* Portfolios */
    private DeletePortfolioDetails = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/details';
    private DeletePortfolioProperty = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/properties';
    private DeletePortfolioTrades = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/trades';
    private DeletePortfolio = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}';
    private DeleteTradeProperty = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/trades/{tradeId}/properties';
    private DeletePortfolios = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/properties/all';
    private GetPortfolios = this.PortfoliosUrlEndpoint + '/{scope}';
    private GetPortfolio = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/root';
    private GetProtfolioDetails = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/details';
    private GetPortfolioPrties = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/properties';
    private GetPortfolioTrades = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/trades';
    private LookPortfolioByName = this.PortfoliosUrlEndpoint + '/{scope}/lookup/{name}';
    private GetPortfolioVersion = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/versions/latest';
    private GetPortfolioVersionByDate = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/versions/at';
    private GetPortfolioVersionAll = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/versions';
    private GetPortfolioAggregateHoldings = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/holdings';
    private CreatePortfolio = this.PortfoliosUrlEndpoint + '/{scope}';
    private CreateDerivedPortfolio = this.PortfoliosUrlEndpoint + '/{scope}/derived';
    private UpdatePortfolioDetails = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/root';
    private AddupdatePortfolioDetails = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/details';
    private CreatePortfolioProperty = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/properties';
    private AddPortfolioTrades = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/trades';
    private SetPortfolioTradesDate = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/trades/set';
    private CreatePortfolioTradesSpecifiedHoldings = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/holdings/{effectiveDate}';
    private AddPortfolioTradeProperties = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/trades/{tradeId}/properties';
    private AddPortfolioTradePropertyToAllTrade = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/trades/properties';
    private RevertPortfolioState = this.PortfoliosUrlEndpoint + '/{scope}/{portfolioId}/versions/{version}/copy';

    /* Properties */
    private DeletePropertyDefinition = this.PropertiesUrlEndpoint + '/{domain}/{scope}/{name}';
    private GetPropertyDefinitions = this.PropertiesUrlEndpoint + '';
    private GetPropertyDefinition = this.PropertiesUrlEndpoint + '/{domain}/{scope}/{name}';
    private GetManyPropertyDefinitions = this.PropertiesUrlEndpoint + '/{domain}/_keys';
    private GetPropertyDefinitionsByDomain = this.PropertiesUrlEndpoint + '/{domain}';
    private GetPropertyDefinitionsByDomainScope = this.PropertiesUrlEndpoint + '/{domain}/_scopes';
    private GetPropertiesByScope = this.PropertiesUrlEndpoint + '/{domain}/{scope}';
    private CreatePropertyDefinition = this.PropertiesUrlEndpoint + '';
    private UpdatePropertyDefinition = this.PropertiesUrlEndpoint + '';

    /* Property Dataformat */
    private GetPropertyDataformat = this.PropertyDataFormatUrlEndpoint + '/{scope}/{name}';
    private GetPropertyDataformatsByScope = this.PropertyDataFormatUrlEndpoint + '/{scope}';
    private UpsertPropertyDataFormat = this.PropertyDataFormatUrlEndpoint + '/{type}';

    /* Reference Portfolio */
    private DeleteReferencePortfolio = this.ReferencePortfoliosUrlEndpoint + '/{scope}/{portfolioId}';
    private GetReferencePortfoliosByScope = this.ReferencePortfoliosUrlEndpoint + '/{scope}';
    private GetReferencePortfolioConstituents = this.ReferencePortfoliosUrlEndpoint + '/{scope}/{referencePortfolioId}/{effectiveDate}/constituents';
    private GetRreferencePortfolioByName = this.ReferencePortfoliosUrlEndpoint + '/{scope}/lookup/{name}';
    private CreateReferencePortfolio = this.ReferencePortfoliosUrlEndpoint + '/{scope}';
    private AddReferencePortfolioConstituents = this.ReferencePortfoliosUrlEndpoint + '/{scope}/{referencePortfolioId}/{effectiveDate}/constituents';

    /* Results */
    private GetResults = this.ResultsUrlEndpoint + '/{scope}/{key}/{date}';
    private UpsertResultsByCombination = this.ResultsUrlEndpoint + '/{scope}/{key}/{date}';

    /* Schema */
    private GetSchemaForEntity = this.SchemaUrlEndpoint + '/entities/{entity}';

    /* Property definitions */
    private SearchPropertyDefinitions = this.PropertiesUrlEndpoint + '/search';

    /* Securities */
    private LookupSecurityByIsin = this.SearchProxyUrlEndpoint + '/lookup/{codeType}/{code}';
    private LookupSecurities = this.SearchProxyUrlEndpoint + '/lookup/{codeType}';
    private DeleteSecurities = this.SearchProxyUrlEndpoint + '';
    private CreateSecurities = this.SearchProxyUrlEndpoint + '';
    
    constructor(private http: Http,
                private _router: Router,
                private _cookieService: CookieService) { }

    ObtainAuthorizationGrantfromUser(AuthorizationUrl: string): Observable<any> {
        console.log('Enter: ObtainAuthorizationGrantfromUser Url=' + AuthorizationUrl);
        return this.http.get(this.AuthorizationUrl)
            .map((response: Response) => <number>response.json())
            .do((data: number) => console.log('ObtainAuthorizationGrantfromUser: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    // GET one
    GetLatestExcelAddinVersion(): Observable<any> {
        return this.http.get(this.GetLatestExcelVersion)
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