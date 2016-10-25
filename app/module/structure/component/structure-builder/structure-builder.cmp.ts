import {Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Http} from '@angular/http';
import { NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {App_Const} from '../../../paws-common/';
import {PageConfig_Mdl, Renderer_Svc} from '../../';

@Component({
	selector: 'structure',
	template: require('./structure-builder.cmp.html')
})
export class StructureBuilder_Cmp implements OnInit, OnDestroy {
	private routerEventSub: Subscription;
	//Once loaded, will contain the mapping of site routes/paths to json files
	private routeMap: any;
	//Routes called before the routeMap has loaded will be stored here.
	private pendingRoute: any;
	//View child contains the rendered content for the structure
	@ViewChild('structure', {read: ViewContainerRef}) structureContainer: ViewContainerRef;

	constructor(private router: Router,
	            private http: Http,
	            private renderer: Renderer_Svc,
				@Inject(App_Const) private constants) {
	}

	ngOnInit() {
		let routeMapUrl = this.constants.url.dataRoot + this.constants.url.routeDataFilesMap;

		this.routerEventSub = this.router.events
			.filter(evt => evt instanceof NavigationEnd)
			.subscribe(evt => {
				this.onNavigationEnd(evt);
			});

		this.http.get(routeMapUrl)
			.map(res => res.json())
			.subscribe(result => {
					this.routeMap = result;
					if (this.pendingRoute) {
						this.onNavigationEnd(this.pendingRoute);
						this.pendingRoute = null;
					}
				},
				error => {
					//TODO: Don't throw an error, catch it and redirect to a 404/"omg its broken" page.
					throw new Error(`Critical error - could not load site route map. The resource '${routeMapUrl}' could not be found.`);
				});
	}

	/**
	 * Retrieve page-specific configuration JSON files.
	 *
	 * @param path
	 */
	private getPageDataFromPath(path: string) {
		let url = this.constants.url.dataRoot;
		let routes = this.routeMap.routes;
		let defaultKey = this.constants.routeMap.routeDataDefaultKey;

		path = path[0] === '/' ? path : '/' + path;
		if(routes.hasOwnProperty(path)){
			url += routes[path];
		}
		else if(routes.hasOwnProperty(defaultKey)){
			console.warn(`Falling back to default page for path ${path}`);
			url += routes[defaultKey];
		}
		else{
			//TODO: No default and no recognized path. Bail/404 instead of erroring out
			throw new Error(`No matching page found for route path ${path}`);
		}

		this.http.get(url)
			.map(res => res.json())
			.subscribe(result => {
					this.onPageConfigChange(result)
				},
				error => {
					console.warn(`Error retrieving page JSON file for ${url}. The file does not exist.`);
					//Redirect to 404
				});
	}

	/**
	 * When page navigation completes, we need to parse the current path to request the new page configuration file.
	 *
	 * @param route
	 */
	private onNavigationEnd(route: any) {
		//Without routeMap loaded, we can't match routes to data files. Set it to pending.
		if(!this.routeMap) {
			this.pendingRoute = route;
			return;
		}

		let path:string = route.url;

		if(route.url[0] === '/'){
			path = route.url.substring(1);
		}

		this.getPageDataFromPath(path);
	}

	/**
	 * Handler for when page config files get loaded
	 *
	 * @param config
	 */
	private onPageConfigChange(config:any){
		let conf = new PageConfig_Mdl(config);
		this.renderer.renderPage(conf, this.structureContainer);
	}

	ngOnDestroy() {
		this.routerEventSub.unsubscribe();
	}
}