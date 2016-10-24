import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const pawsCommonRoutes:Routes = [
    {
        path: ''/*,
        component: HomeComponent*/
    }/*,
    {
        path: '404',
        component: Error404Component
    }*/
];

export const PawsCommonRoutes: ModuleWithProviders = RouterModule.forChild(pawsCommonRoutes);
