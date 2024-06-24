import {Component} from '@angular/core';
import {AppModule} from "./app.module";
import {WaveBinder} from "../../../wave-binder/wvb/lib/wave-binder";

@Component({
	selector: 'app-root',
	imports: [AppModule],
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	configurationFileName!: string;
	waveBinder!: WaveBinder;

	async uploadConfiguration(event: any) {
		let file: File = event.target.files[0];
		if (file == null) return;
		file.text().then(s => {
			this.configurationFileName = file.name;
			let configurationContent = JSON.parse(s)
			this.waveBinder = new WaveBinder(configurationContent['params'])
			this.waveBinder.tangleNodes()
		})
	}

	async setValue(value: any, nodeName: string) {
		this.waveBinder.getNodeByName(nodeName).next(value);
	}

	getDataPool() {
		return JSON.stringify(this.waveBinder?.getDataPool(), null, 4);
	}
}
