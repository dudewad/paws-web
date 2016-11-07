import {Component, Inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {App_Const, Asset_Svc} from '../../../paws-common/';

@Component({})
export abstract class StructureBase_Cmp {
	protected config: any = {};
	protected content: any = {};
	private url: any = {};

	constructor(protected sanitizer: DomSanitizer,
	            @Inject(App_Const) protected constants,
	            //TODO: OpaqueToken-ize the asset service injection so this stays portable
	            protected assetSvc: Asset_Svc){
		this.url = constants.url;
	}

	public setConfig(config: any) {
		this.content = config.content;
		this.config = config.config;
		this.setBackground();
	}

	public getSanHtml(str) {
		return this.sanitizer.bypassSecurityTrustHtml(str);
	}

	public getAssetUrl(filename) {
		return this.assetSvc.getAssetUrl(`${filename}`);
	}

	private setBackground() {
		if(!this.config.background) {
			return;
		}

		let styles = this.constants.componentConfig.backgroundStyles;
		let bg = this.config.background;

		if(bg.style) {
			switch (bg.style.toLowerCase()) {
				case styles.image:
					//let bgUrl = this.getAssetURL(bg.value);
					this.config.style = {
						'background-image': `url("${this.getAssetUrl(bg.value)}")`,
						'background-size': bg['size'] || 'cover',
						'background-position': bg['position'] || 'center'
					};
					break;
				case styles.color:
					this.config.style = {
						background: bg.value
					};
					break;
				default:
					console.warn("Unrecognized background type set. Your JSON is WRONG, Rylan. Try again.");
					console.log("Possible options are:");
					for (var style in styles) {
						console.log(`${style}`);
					}
					break;
			}
		}
	}
}