import {Component, Inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {App_Const} from '../../../paws-common/';

@Component({})
export class StructureBase_Cmp {
	private config: any = {};
	private content: any = {};

	constructor(protected sanitizer: DomSanitizer,
	            @Inject(App_Const) protected constants){
	}

	public setConfig(config: any) {
		this.content = config.content;
		this.config = config.config;
		this.setBackground();
	}

	public getSanHtml(str) {
		return this.sanitizer.bypassSecurityTrustHtml(str);
	}

	private setBackground() {
		let styles = this.constants.componentConfig.backgroundStyles;
		let bg = this.config.background;

		switch (bg.style) {
			case styles.image:
				this.config.style = {
					'background-image': `url("${this.constants.url.contentRoot}${bg.value}")`,
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
				for(var style in styles){
					console.log(`${style}`);
				}

				break;
		}
	}
}