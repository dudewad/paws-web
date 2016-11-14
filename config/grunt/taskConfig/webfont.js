/**
 * Grunt task configuration - grunt-webfont
 */
module.exports = {
    dev: {
	    src: "<%= pkg.directories.fontRoot %>pawsIcon/src/**/*",
	    dest: "<%= pkg.directories.fontRoot %>pawsIcon/",
	    destCss: "<%= pkg.directories.scssRoot %>generated/",
	    options:{
		    autoHint: false,
		    engine: "node",
		    font: "pawsIcon",
		    normalize: true,
		    relativeFontPath: "<%= pkg.url.dev.contentRoot %><%= pkg.url.relative.font %>pawsIcon/",
		    stylesheet: "scss",
		    templateOptions: {
			    baseClass: 'pawsIcon',
			    classPrefix: 'pawsIcon-'
		    }
	    }
    },
    staging: {
	    src: "<%= pkg.directories.fontRoot %>pawsIcon/src/**/*",
	    dest: "<%= pkg.directories.fontRoot %>pawsIcon/",
	    destCss: "<%= pkg.directories.scssRoot %>generated/",
	    options:{
		    autoHint: false,
		    engine: "node",
		    font: "pawsIcon",
		    normalize: true,
		    relativeFontPath: "<%= pkg.url.staging.contentRoot %><%= pkg.url.relative.font %>pawsIcon/",
		    stylesheet: "scss",
		    templateOptions: {
			    baseClass: 'pawsIcon',
			    classPrefix: 'pawsIcon-'
		    }
	    }
    },
    prod: {
	    src: "<%= pkg.directories.fontRoot %>pawsIcon/src/**/*",
	    dest: "<%= pkg.directories.fontRoot %>pawsIcon/",
	    destCss: "<%= pkg.directories.scssRoot %>generated/",
	    options:{
		    autoHint: false,
		    engine: "node",
		    font: "pawsIcon",
		    normalize: true,
		    relativeFontPath: "<%= pkg.url.prod.contentRoot %><%= pkg.url.relative.font %>pawsIcon/",
		    stylesheet: "scss",
		    templateOptions: {
			    baseClass: 'pawsIcon',
			    classPrefix: 'pawsIcon-'
		    }
	    }
    }
};