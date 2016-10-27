import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
	Footer_Cmp,
	Header_Cmp,
	MainMenu_Cmp
} from './component';
import {Config_Svc} from "./service";

@NgModule({
	declarations: [
		Footer_Cmp,
		Header_Cmp,
		MainMenu_Cmp
	],
	imports: [
		CommonModule
	],
	exports: [
		Footer_Cmp,
		Header_Cmp,
		MainMenu_Cmp
	],
	providers: [
		Config_Svc
	]
})

export class PawsCommon_Mod {
}