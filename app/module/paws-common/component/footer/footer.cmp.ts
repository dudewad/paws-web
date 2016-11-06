import {Component, Inject, OnInit, OnDestroy} from '@angular/core';

import {App_Const, Config_Svc} from "../../";

@Component({
	selector: 'site-footer',
	template: require('./footer.cmp.html'),
	styles: [require('./footer.cmp.scss')]
})

export class Footer_Cmp implements OnInit, OnDestroy{
	private config: any;
	private configSvcUnsubscriber: any;
	private content: any = {};

	constructor(private configSvc: Config_Svc,
	            @Inject(App_Const) private constants) {
	}

	private onConfigChange(type, config) {
		if (type === this.constants.configTypes.global) {
			this.config = config.component.footer;
			this.content = config.component.footer.content;
		}
	}

	ngOnInit() {
		this.config = this.configSvc.getConfig(this.constants.configTypes.global);
		this.configSvcUnsubscriber = this.configSvc.onConfigUpdate(this.onConfigChange.bind(this));
	}

	ngOnDestroy() {
		this.configSvcUnsubscriber();
	}
}