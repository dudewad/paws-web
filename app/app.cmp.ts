import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'app-main',
	template: require('./app.cmp.html'),
	styles: [require('./app.scss')],
	encapsulation: ViewEncapsulation.None
})
export class App_Cmp {
	private state:any = {
		header: {
			enabled: true
		},
		footer: {
			enabled: true
		},
		mainMenu: {
			enabled: true
		}
	};

	constructor(){
	}
}