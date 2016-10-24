import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {App_Mod} from './module/app.mod';

const platform = platformBrowserDynamic();
platform.bootstrapModule(App_Mod);