import {Component} from '@angular/core';

import {PageManager_Svc} from './structure';

@Component({
	selector: 'app-main',
	template: require('./app.cmp.html')
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

	constructor(private pageManager: PageManager_Svc){
	}
}