import {Component, Inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {App_Const, Asset_Svc, GlobalEvent_Svc} from '../../../paws-common/';
import {StructureBase_Cmp} from '../../';

@Component({
	selector: 'data-table',
	template: require('./data-table.cmp.html'),
	styles: [require('./data-table.cmp.scss')]
})
export class DataTable_Cmp extends StructureBase_Cmp {
	constructor(protected sanitizer: DomSanitizer,
	            @Inject(App_Const) protected constants,
	            protected assetSvc: Asset_Svc,
	            protected globalEventSvc: GlobalEvent_Svc) {
		super(sanitizer, constants, assetSvc, globalEventSvc);
	}
}