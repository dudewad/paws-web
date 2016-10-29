import {Component, Inject, OnInit} from '@angular/core';

import {App_Const} from '../../../paws-common/';
import {StructureBase_Cmp} from "../../";

@Component({
	selector: 'hero',
	template: require('./hero.cmp.html'),
	styles: [require('./hero.cmp.scss')]
})
export class Hero_Cmp extends StructureBase_Cmp implements OnInit{
	constructor(@Inject(App_Const) protected constants) {
		super(constants);
	}

	ngOnInit() {
		console.log("init hero");
	}
}