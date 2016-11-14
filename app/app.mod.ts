import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {Routing} from           './app.routes.ts';
import {App_Cmp} from './app.cmp';
import {Constants} from './app-constants.const';
import {App_Const, PawsCommon_Mod} from './module/paws-common';
import {Structure_Mod} from './module/structure';

@NgModule({
	declarations: [
		App_Cmp
	],
	imports: [
		BrowserModule,
		PawsCommon_Mod,
		Structure_Mod,
		Routing
	],
	providers: [
		{provide: App_Const, useValue: Constants}
	],
	bootstrap: [
		App_Cmp
	]
})
export class App_Mod {
}