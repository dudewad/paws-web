import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {
	Hero_Cmp,
	StructureBuilder_Cmp
} from './component';
import {Renderer_Svc} from './service';

@NgModule({
	declarations: [
		Hero_Cmp,
		StructureBuilder_Cmp
	],
	entryComponents: [
		Hero_Cmp
	],
	exports: [
		StructureBuilder_Cmp
	],
	imports: [
		CommonModule,
		HttpModule
	],
	providers: [
		Renderer_Svc
	]
})

export class Structure_Mod {
}