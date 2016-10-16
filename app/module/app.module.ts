import {NgModule}               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {App}                    from './app.component';
import {PawsCommon}             from './paws-common';

@NgModule({
	declarations: [
		App
	],
	imports: [
		BrowserModule,
		PawsCommon
	],
	bootstrap: [
		App
	]
})
export class AppModule {
}