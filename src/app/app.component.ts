import {AfterViewInit, Component} from '@angular/core';
import {AppModule} from "./app.module";
import {UiComponent} from "./model/ui/ui.component";
import {RobotComponent} from "./robot/robot.component";
import {ManageRobotService} from "./robot/manage-robot.service";
import {WaveBinderManagerService} from "./service/wave-binder-manager.service";
import {MultiNode} from "../../../wave-binder/wvb/lib/wvb/node";

@Component({
	selector: 'app-root',
	imports: [AppModule, UiComponent, RobotComponent],
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

	public constructor(private engServ: ManageRobotService,
					   private wbService: WaveBinderManagerService) {
	}

	ngAfterViewInit(): void {
		let departingCountry: MultiNode = this.wbService.getNode('departingCountry') as MultiNode;
		departingCountry.subscribe(value => {
			this.engServ.executeEmotes('Wave')
		});
		let arrivingCountry: MultiNode = this.wbService.getNode('arrivingCountry')  as MultiNode;
		arrivingCountry.subscribe(value => {
			this.engServ.executeEmotes('ThumbsUp')
		});
		let actions: MultiNode = this.wbService.getNode('actions')  as MultiNode;
		actions.subscribe(value => {
			if (value != null) {
				this.engServ.setState(value.action)
				this.engServ.executeEmotes(value.emotes)
			}
		});
		let faceExpression: MultiNode = this.wbService.getNode('faceExpression')  as MultiNode;
		faceExpression.subscribe(value => {
			this.engServ.setFaceExpression(value)
		});

	}

}
