/**
 * Grunt task configuration - grunt-webfont
 */
module.exports = {
    dist: {
	    src: "<%= pkg.directories.fontRoot %>pawsIcon/src/**/*",
	    dest: "<%= pkg.directories.fontRoot %>pawsIcon/",
	    destCss: "<%= pkg.directories.scssRoot %>generated/",
	    options:{
		    autoHint: false,
		    font: "pawsIcon",
		    engine: "node",
		    stylesheet: "scss",
		    templateOptions: {
			    baseClass: 'pawsIcon',
			    classPrefix: 'pawsIcon-'
		    },
		    normalize: true
	    }
    }
};