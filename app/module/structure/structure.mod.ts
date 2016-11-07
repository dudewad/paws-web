import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {
	Hero_Cmp,
	StructureBuilder_Cmp,
	Ribbon_Cmp,
	TextImage_Cmp,
	TileSet_Cmp
} from './component';
import {Renderer_Svc} from './service';
import {Asset_Svc} from "../paws-common";

@NgModule({
	declarations: [
		Hero_Cmp,
		StructureBuilder_Cmp,
		Ribbon_Cmp,
		TextImage_Cmp,
		TileSet_Cmp
	],
	entryComponents: [
		Hero_Cmp,
		Ribbon_Cmp,
		TextImage_Cmp,
		TileSet_Cmp
	],
	exports: [
		StructureBuilder_Cmp
	],
	imports: [
		BrowserModule,
		CommonModule,
		HttpModule
	],
	providers: [
		Asset_Svc,
		Renderer_Svc
	]
})

export class Structure_Mod {
}