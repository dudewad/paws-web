import {Component} from '@angular/core';

@Component({
	template: require('./header.component.ts')
})

export class Header {
	constructor() {
		console.log('header constructor!');
	}
}