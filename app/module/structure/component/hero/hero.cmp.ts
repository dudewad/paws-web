import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {App_Const} from '../../../paws-common/';
import {StructureBase_Cmp} from "../../";

@Component({
	selector: 'hero',
	template: require('./hero.cmp.html'),
	styles: [require('./hero.cmp.scss')]
})
export class Hero_Cmp extends StructureBase_Cmp implements OnInit{
	constructor(protected sanitizer: DomSanitizer,
	            @Inject(App_Const) protected constants) {
		super(constants);
	}

	//TODO: abstract this to structure-base. For now, it is breaking with webpack
	//and requires further investigation
	public getSanHtml(str) {
		return this.sanitizer.bypassSecurityTrustHtml(str);
	}

	ngOnInit() {
		console.log("init hero");
	}
}