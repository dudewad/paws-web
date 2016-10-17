import {NgModule} from '@angular/core';
import {
	Footer_Cmp,
	Header_Cmp,
	MainMenu_Cmp
} from './component';

@NgModule({
	declarations: [
		Footer_Cmp,
		Header_Cmp,
		MainMenu_Cmp
	],
	exports: [
		Footer_Cmp,
		Header_Cmp,
		MainMenu_Cmp
	]
})
export class PawsCommon {
}