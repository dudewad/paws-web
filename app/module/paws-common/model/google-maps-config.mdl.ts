import {ViewContainerRef} from '@angular/core';

export class GoogleMapsConfig_Mdl {
	private map:google.maps.Map;

	constructor(private elRef: ViewContainerRef,
				private mapConfig:any) {
	}

	getViewContainerRef() {
		return this.elRef;
	}

	getNativeElement() {
		return this.elRef.element.nativeElement;
	}

	getConfig() {
		return this.mapConfig;
	}

	getMap() {
		return this.map;
	}

	setMap(map) {
		this.map = map;
	}
}