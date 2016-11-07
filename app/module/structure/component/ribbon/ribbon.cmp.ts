import {Component, Inject} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import {App_Const, Asset_Svc} from '../../../paws-common/';
import {StructureBase_Cmp} from '../../';

@Component({
	selector: 'ribbon',
	template: require('./ribbon.cmp.html'),
	styles: [require('./ribbon.cmp.scss')]
})
export class Ribbon_Cmp extends StructureBase_Cmp {
	private iframeSrc:SafeResourceUrl;

	constructor(protected sanitizer: DomSanitizer,
	            @Inject(App_Const) protected constants,
	            protected assetSvc: Asset_Svc) {
		super(sanitizer, constants, assetSvc);
	}

	public setConfig(config) {
		super.setConfig(config);
		this.setIframeSrc();
	}

	private setIframeSrc() {
		if (this.content && this.content.iframe) {
			this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.content.iframe);
		}
	}
}