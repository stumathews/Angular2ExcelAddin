import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService'
import { ListPortfolioRootsResponse, ErrorResponse  } from '@finbourne/lusidtypes';

@Component({
  moduleId: module.id,
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
})
export class PortfoliosComponent implements OnInit {
    Title: string = "List portfolios";
    Description: string = 'These are the portfolios';
    constructor(private apiService: ApiService) { }
    ngOnInit() {
        this.apiService.GetAllPortfolios().subscribe((value: ListPortfolioRootsResponse | ErrorResponse) => {
            /* Deal with response here */
        }, error => {
            /* Deal with error here*/
        });
    }

}
