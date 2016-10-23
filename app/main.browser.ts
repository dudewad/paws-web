import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './module/app.mdl';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);