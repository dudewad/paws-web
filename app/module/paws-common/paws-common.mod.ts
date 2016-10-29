import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainMenu_Mod} from '../main-menu';

import {
	Footer_Cmp,
	Header_Cmp
} from './component';
import {Config_Svc} from "./service";

@NgModule({
	declarations: [
		Footer_Cmp,
		Header_Cmp
	],
	imports: [
		CommonModule,
		MainMenu_Mod
	],
	exports: [
		Footer_Cmp,
		Header_Cmp
	],
	providers: [
		Config_Svc
	]
})

export class PawsCommon_Mod {
}