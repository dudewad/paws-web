import {
	Injectable,
	ComponentFactoryResolver
} from '@angular/core';

import {Renderer_Svc} from './renderer.svc';
import {
	Hero_Cmp
} from '../';

@Injectable()
export class PageManager_Svc {
	constructor(private renderer: Renderer_Svc,
	            private cmpResolver: ComponentFactoryResolver) {
	}
}