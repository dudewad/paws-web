import {Inject} from '@angular/core';

import {App_Const} from '../../../paws-common/';

export class StructureBase_Cmp {
	private config: any = {};
	private content: any = {};
	private baseClasses:Array<string> = ['structure'];

	constructor(@Inject(App_Const) protected constants){
	}

	public setConfig(config: any) {
		this.content = config.content;
		this.config = config.config;
		this.setBackground();
	}

	private getClasses() {
		return this.baseClasses.concat(this.config.class);
	}

	private setBackground() {
		let styles = this.constants.componentConfig.backgroundStyles;
		let bg = this.config.background;

		switch (bg.style) {
			case styles.image:
				this.config.style = {
					'background-image': `url("${this.constants.url.contentRoot}${bg.value}")`,
					'background-size': 'cover'
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