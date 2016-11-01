var $ = require("jquery");

let consts = {
	configTypes:{
		app: 'app',
		global: 'global'
	},
	url: {
		contentRoot: 'app/assets/',
		//Root for site page/component structure data (i.e. site definition JSON files)
		dataRoot: 'app/site-data/',
		//This file maps the route paths (routes) to data files for configuration of the site
		config: 'config.json'
	},
	routeMap: {
		//The key for the route map's "default" option
		routeDataDefaultKey: 'default',
		//A suffix at the end of component names that is consistent across the project. This will allow for more
		//user-friendly names in the routemap files but will require it to be added to the names when parsing them.
		componentExtension: '_Cmp'
	},
	componentConfig: {
		backgroundStyles: {
			image: 'image',
			color: 'color'
		}
	}
};

/**
 * Staging mode constant overrides
 */
if(ENV === 'staging') {
	consts = $.extend(true, consts, {
		url: {
			contentRoot: '/staging/assets/',
			dataRoot: '/staging/site-data/',
		}
	});
}

/**
 * Prod mode constant overrides
 */
if(ENV === 'production') {
	consts = $.extend(true, consts, {
		url: {
			contentRoot: '//contents.pawsforabeer.com/',
			dataRoot: '/site-data/',
		}
	});
}

export const Constants = consts;