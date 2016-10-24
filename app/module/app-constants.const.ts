export const Constants = {
	url: {
		//Root for site page/component structure data (i.e. site definition JSON files)
		dataRoot: 'app/site-data/',
		//This file maps the route paths (routes) to data files for configuration of the site
		routeDataFilesMap: 'routes.json'
	},
	routeMap: {
		//The key for the route map's "default" option
		routeDataDefaultKey: 'default',
		//A suffix at the end of component names that is consistent across the project. This will allow for more
		//user-friendly names in the routemap files but will require it to be added to the names when parsing them.
		componentExtension: '_Cmp'
	}
};