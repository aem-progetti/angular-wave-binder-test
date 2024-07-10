import {Component, ViewEncapsulation} from '@angular/core';
import {CountrySelectionComponent} from "./country-selection/country-selection.component";
import {TravelDetailsComponent} from "./travel-details/travel-details.component";
import {AppModule} from "../../app.module";
import {ManageRobotService} from "../../robot/manage-robot.service";
import {WaveBinderManagerService} from "../../service/wave-binder-manager.service";
import {NgOptimizedImage} from "@angular/common";


@Component({
	selector: 'app-ui',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	templateUrl: './ui.component.html',
	styleUrl: './ui.component.scss',
	imports: [
		AppModule,
		CountrySelectionComponent,
		TravelDetailsComponent,
		NgOptimizedImage
	]
})
export class UiComponent{
	public constructor(protected engServ: ManageRobotService,
					   protected wbService: WaveBinderManagerService) {
	}
}

