import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { demoRouting } from '../app.routing';
import { OverviewComponent } from './Overview/overview';
import { OfficeInteractionComponent } from './OfficeInteraction/office-interaction.component';
import { OfficeModule } from '../office/office.module';
import { OfficeUiModule } from '../office-ui/office-ui.module';
import { ExcelService } from '../office/excel.service';
import { PortfoliosComponent } from './Portfolios/portfolios.component';
import { ApiService } from './apiService';

@NgModule({
    imports: [BrowserModule, FormsModule, demoRouting, OfficeModule, OfficeUiModule],
    providers: [ExcelService, ApiService ],
    declarations: [ OverviewComponent, OfficeInteractionComponent, PortfoliosComponent ],
    exports: [ OverviewComponent, OfficeInteractionComponent ]
})
export class PluginModule { }