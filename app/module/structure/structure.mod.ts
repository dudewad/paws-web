import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {
	Hero_Cmp,
	StructureBuilder_Cmp
} from './component';
import {
	PageManager_Svc,
	Renderer_Svc
} from './service';

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
		HttpModule
	],
	providers: [
		Renderer_Svc,
		PageManager_Svc
	]
})

export class Structure_Mod {
}