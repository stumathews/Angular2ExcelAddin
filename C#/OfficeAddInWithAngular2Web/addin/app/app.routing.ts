import { Routes, RouterModule }  from '@angular/router';

import { OverviewComponent } from './overview';
import { OfficeInteractionComponent } from './office-interaction.component';

import { PortfoliosComponent } from './portfolios/portfolios.component';



export const routes: Routes = [
    {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'        
    },
    {
        path: 'overview',
        component: OverviewComponent
    },
    {
        path: 'office',
        component: OfficeInteractionComponent
    },
    {
        path: 'Portfolios',
        component: PortfoliosComponent
    }
];

export const demoRouting = RouterModule.forRoot(routes);