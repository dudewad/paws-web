import {Component, ElementRef, OnInit} from '@angular/core';

import {StructureComponent_Inf} from "../../interface/structure-component.inf";

@Component({
	selector: 'hero',
	template: require('./hero.cmp.html'),
	styles: [require('./hero.cmp.scss')]
})
export class Hero_Cmp implements OnInit, StructureComponent_Inf{
	private content:any = {};
	private config: any = {};

	constructor(private el: ElementRef) {
	}

	ngOnInit() {
	}

	public setConfig(config:any) {
		this.content = config.content;
		this.config = config.config;
	}
}