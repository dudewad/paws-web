import {Component, Inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {App_Const, Asset_Svc} from '../../../paws-common/';
import {StructureBase_Cmp} from '../../';

@Component({
	selector: 'tile-set',
	template: require('./tile-set.cmp.html'),
	styles: [require('./tile-set.cmp.scss')]
})
export class TileSet_Cmp extends StructureBase_Cmp{
	constructor(protected sanitizer: DomSanitizer,
	            @Inject(App_Const) protected constants,
	            protected assetSvc: Asset_Svc) {
		super(sanitizer, constants, assetSvc);
	}
}