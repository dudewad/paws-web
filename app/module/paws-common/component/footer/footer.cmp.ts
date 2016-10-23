import {Component} from '@angular/core';

@Component({
	selector: 'site-footer',
	template: require('./footer.cmp.html')
})

export class Footer_Cmp {
	constructor() {
		console.log('footer constructor!');
	}
}