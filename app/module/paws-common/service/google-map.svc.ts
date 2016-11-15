import {Inject, Injectable} from '@angular/core';
import {App_Const} from '../';
import {Asset_Svc} from './asset.svc';

@Injectable()
export class GoogleMap_Svc {
	private map:google.maps.Map;
	private loading:boolean = false;
	private loaded:boolean = false;
	private mapEl:any;
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

	constructor(private assetSvc:Asset_Svc,
	            @Inject(App_Const) private constants) {
	}

	initMap(mapEl) {
		if(!mapEl) {
			console.error("Cannot init map - no map element provided.");
			return;
		}
		if(this.loading) {
			console.warn("Aborting attempt to init Google map - already in loading state.");
			return;
		}
		this.mapEl = mapEl;

		if(!this.loaded) {
			let s = document.createElement('script');
			this.loading = true;
			s.src = this.constants.url.googleMapsImport.replace('$$API_KEY$$', this.constants.vendor.googleMaps.apiKey);
			s.onload = this.onMapsLoad.bind(this);
			document.getElementsByTagName('body')[0].appendChild(s);
		}
		else {
			this.onMapsLoad();
		}
	}

	private onMapsLoad() {
		let placeId: string = this.constants.vendor.googleMaps.placeIds.store;
		let geocoder: google.maps.Geocoder = new google.maps.Geocoder;

		this.loaded = true;
		this.loading = false;
		this.map = new google.maps.Map(this.mapEl.element.nativeElement, {
			zoom: 15,
			scrollwheel: false,
			styles: this.mapStyles
		});
		geocoder.geocode({'placeId': placeId}, (function (results, status: any) {
			if (status === 'OK') {
				if (results[0]) {
					let storeLocation: any = results[0].geometry.location;
					new google.maps.Marker({
						position: storeLocation,
						map: this.map,
						icon: {
							size: new google.maps.Size(120, 120),
							scaledSize: new google.maps.Size(120, 120),
							url: this.assetSvc.getAssetUrl('/paws-marker.svg')
						},
					});
					this.map.setCenter(storeLocation);
				}
			}
			else {
				console.error(`Map failed to load- geocode on place id ${placeId} failed.`);
			}
		}).bind(this));
	}
}