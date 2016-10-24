import {
	Injectable,
	ComponentFactoryResolver
} from '@angular/core';

@Injectable()
export class Renderer_Svc {
	constructor(private cmpResolver: ComponentFactoryResolver) {

	}
}