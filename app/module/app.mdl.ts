import {NgModule}               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {RouterModule}           from '@angular/router';
import {RouterOutletMap}        from '@angular/router';
import {App_Cmp}                    from './app.cmp';
import {PawsCommon}             from './paws-common';

@NgModule({
	declarations: [
		App_Cmp
	],
	imports: [
		BrowserModule,
		PawsCommon,
		RouterModule
	],
	providers: [
		RouterOutletMap
	],
	bootstrap: [
		App_Cmp
	]
})
export class AppModule {
}