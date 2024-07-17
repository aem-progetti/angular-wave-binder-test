import {AfterViewInit, Component} from '@angular/core';
import {WaveBinderManagerService} from "../../../service/wave-binder-manager.service";
import {AppModule} from "../../../app.module";
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";
import {ListNode, MultiNode, SingleNode} from "../../../../../../wave-binder/wvb/lib/wvb/node";

@Component({
	selector: 'app-selection-list',
	standalone: true,
	imports: [AppModule, CdkDropList, CdkDrag],
	templateUrl: './selection-list.component.html',
	styleUrl: './selection-list.component.css'
})
export class SelectionListComponent implements AfterViewInit {
	constructor(protected wbService: WaveBinderManagerService) {
	}

	index = 1;

	ngAfterViewInit() {
	}

	setValue(value: any, $index: number) {
		this.getCountryListNode().children[$index].next(value);
	}

	getCountryInfos(name: string, $index: number) {
		let value = this.getCountryListNode().children[$index].value;
		return value ? value[name] : null;
	}

	addSelection($index: number) {
		this.index++
		this.getCountryListNode().next(this.index, $index + 1)
		this.resizeDistanceNode()
	}

	removeSelection($index: number) {
		this.index--
		this.getCountryListNode().next(this.index, $index)
		this.resizeDistanceNode()
	}

	drop($event: CdkDragDrop<any, any>) {
		if ($event.previousIndex == $event.currentIndex) return;
		this.getCountryListNode().moveElement($event.previousIndex, $event.currentIndex)
	}

	printChildren() {
		console.log(this.getCountryListNode().getNodeValue())
		console.log(this.getCountryListNode().children);
		console.log(this.getDistancesNode().children);
		console.log(this.getDistancesNode().getNodeValue());
		console.log(this.wbService.waveBinder.getNodes())
	}

	getCountryListNode(): ListNode {
		return this.wbService.getNode('countryList') as ListNode;
	}

	getDistancesNode(): ListNode {
		return this.wbService.getNode('distances') as ListNode;
	}

	resizeDistanceNode() {
		this.getDistancesNode().next(this.index - 1)
		let node = this.wbService.getNode('timeList') as ListNode;
		node.next(this.index - 1)
	}

	getChoices(child: SingleNode | MultiNode) {
		let multi = child as MultiNode;
		return multi.choices
	}
}
