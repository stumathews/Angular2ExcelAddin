import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService'
import { ListPortfolioRootsResponse, IErrorResponse  } from '@finbourne/lusidtypes';

@Component({
  moduleId: module.id,
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
})
export class PortfoliosComponent implements OnInit {
    title: string = "List portfolios";
    description: string = 'These are the portfolios';
    constructor(private apiService: ApiService) { }
    ngOnInit() {
        this.apiService.GetAllPortfolios().subscribe((value: ListPortfolioRootsResponse | IErrorResponse) => {
            /* Deal with response here */
        }, error => {
            /* Deal with error here*/
        });
    }

}
