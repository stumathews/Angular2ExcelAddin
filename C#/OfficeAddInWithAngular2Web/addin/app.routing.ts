import { Routes, RouterModule }  from '@angular/router';
import { OverviewComponent } from './plugin/Overview/overview';
import { OfficeInteractionComponent } from './plugin/OfficeInteraction/office-interaction.component';
import { PortfoliosComponent } from './plugin/Portfolios/portfolios.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Overview', pathMatch: 'full' },
    { path: 'Overview', component: OverviewComponent },
    { path: 'OfficeInteraction', component: OfficeInteractionComponent },
    { path: 'Portfolios', component: PortfoliosComponent } ];

export const demoRouting = RouterModule.forRoot(routes);