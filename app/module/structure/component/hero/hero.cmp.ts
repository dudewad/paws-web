import {Component, Inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {App_Const} from '../../../paws-common/';
import {StructureBase_Cmp} from '../../';

@Component({
	selector: 'hero',
	template: require('./hero.cmp.html'),
	styles: [require('./hero.cmp.scss')]
})
export class Hero_Cmp extends StructureBase_Cmp{
	constructor(protected sanitizer: DomSanitizer,
	            @Inject(App_Const) protected constants) {
		super(sanitizer, constants);
	}
}