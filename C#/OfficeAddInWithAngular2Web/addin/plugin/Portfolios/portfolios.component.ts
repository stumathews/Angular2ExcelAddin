import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
})
export class PortfoliosComponent implements OnInit {
    title: string = "List portfolios";
    description: string = 'These are the portfolios';

  ngOnInit() {}

}
