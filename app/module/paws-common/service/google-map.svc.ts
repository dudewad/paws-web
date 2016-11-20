import {Inject, Injectable} from '@angular/core';
import {App_Const, GoogleMapsConfig_Mdl} from '../';
import {Config_Svc} from './config.svc';
import {Asset_Svc} from './asset.svc';

@Injectable()
export class GoogleMap_Svc{
	private geoCoder: google.maps.Geocoder;
	private mapsApiLoading:boolean = false;
	private mapsApiLoaded:boolean = false;
	private mapConfigs:Array<GoogleMapsConfig_Mdl> = [];
	private mapStyles:any = [
		{
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#f5f5f5"
				}
				]
		},
		{
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
				]
		},
		{
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#616161"
				}
				]
		},
		{
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"color": "#f5f5f5"
				}
				]
		},
		{
			"featureType": "administrative.land_parcel",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#bdbdbd"
				}
				]
		},
		{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#eeeeee"
				}
				]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#757575"
				}
				]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#e5e5e5"
				}
				]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#9e9e9e"
				}
				]
		},
		{
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#ffffff"
				}
				]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#757575"
				}
				]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#dadada"
				}
				]
		},
		{
			"featureType": "road.highway",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#616161"
				}
				]
		},
		{
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#9e9e9e"
				}
				]
		},
		{
			"featureType": "transit.line",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#e5e5e5"
				}
				]
		},
		{
			"featureType": "transit.station",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#eeeeee"
				}
				]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#c9c9c9"
				}
				]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#9e9e9e"
				}
				]
		}
	];
	private apiKey:any;

	constructor(private assetSvc:Asset_Svc,
	            private configSvc: Config_Svc,
	            @Inject(App_Const) private constants) {
		this.apiKey = configSvc.getConfig(this.constants.configTypes.app).vendor.googleMaps.apiKey;
	}

	initMap(mapObj:GoogleMapsConfig_Mdl) {
		this.mapConfigs.push(mapObj);

		if(!this.mapsApiLoaded && !this.mapsApiLoading) {
			this.mapsApiLoading = true;

			let s = document.createElement('script');

			s.src = this.constants.url.googleMapsImport.replace('$$API_KEY$$', this.apiKey);
			s.onload = this.onMapsLoad.bind(this);
			document.getElementsByTagName('body')[0].appendChild(s);
		}
		else if(!this.mapsApiLoading) {
			this.loadMap(mapObj);
		}
	}

	private onMapsLoad() {
		this.mapsApiLoaded = true;
		this.mapsApiLoading = false;
		this.geoCoder = new google.maps.Geocoder();

		for (var i = 0; i < this.mapConfigs.length; i++) {
			this.loadObject(this.mapConfigs[i]);
		}
	}

	private loadObject(mapObj:GoogleMapsConfig_Mdl) {
		let type = mapObj.getConfig().type;
		let viewTypes = this.constants.vendor.googleMaps.viewType;

		if(viewTypes.hasOwnProperty(type)){
			switch(type) {
				case viewTypes.map:
					this.loadMap(mapObj);
					break;
				case viewTypes.streetview:
					this.loadStreetview(mapObj);
					break;
			}
		}
	}

	private loadMap(mapObj:GoogleMapsConfig_Mdl){
		let config: any = mapObj.getConfig();
		let el: any = mapObj.getNativeElement();
		let placeId: string = config.placeId;
		let location:any;

		this.doReverseGeocode(
			placeId,
			(function(results:any, status:any) {
				if (results[0]) {
					location = results[0].geometry.location;
					mapObj.setMap(
						new google.maps.Map(el, {
							zoom: 15,
							scrollwheel: false,
							styles: this.mapStyles,
							center: location
						})
					);

					if (config.marker) {
						this.setMapMarker(mapObj.getMap(), location, config.marker);
					}
				}
				else {
					//TODO: make this display a UI error!
					console.error(`Maps loaded but the placeId [${placeId}] did not geocode properly. Check to make sure it is correct.`);
				}
			}).bind(this),
			function(results, status){
				this.geocodeFailed(placeId, results, status);
			}
		);
	}

	private loadStreetview(mapObj:GoogleMapsConfig_Mdl){
		let config: any = mapObj.getConfig();
		let el: any = mapObj.getNativeElement();
		let placeId: string = config.placeId;
		let location: any;

		this.doReverseGeocode(
			placeId,
			function (results: any, status: any) {
				if (results[0]) {
					location = results[0].geometry.location;
					mapObj.setMap(
						new google.maps.StreetViewPanorama(el, {
							position: location,
							scrollwheel:false,
							pov: {
								heading: 50,
								pitch: -15
							}
						})
					);
				}
				else {
					//TODO: make this display a UI error!
					console.error(`Maps loaded but the placeId [${placeId}] did not geocode properly. Check to make sure it is correct.`);
				}
			},
			function (results, status) {
				this.geocodeFailed(placeId, results, status);
			}
		);
	}

	doReverseGeocode(placeId, successHandler, errorHandler) {
		this.geoCoder.geocode({'placeId': placeId}, (function (results:any, status: any) {
			if (status === 'OK') {
				successHandler(results, status);
			}
			else {
				errorHandler(results, status);
			}
		}));
	}

	private geocodeFailed(placeId, results, status) {
		//TODO make this display a UI error!
		console.error(`Map failed to load- geocode on place id ${placeId} failed.`);
	}

	private setMapMarker(map, location, marker) {
		new google.maps.Marker({
			position: location,
			map: map,
			icon: {
				size: new google.maps.Size(120, 120),
				scaledSize: new google.maps.Size(120, 120),
				url: this.assetSvc.getAssetUrl(marker)
			},
		});
	}
}