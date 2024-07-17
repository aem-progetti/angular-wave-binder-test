import {Injectable} from '@angular/core';
import {WaveBinder} from "../../../../wave-binder/wvb/lib/wave-binder";
import {MultiNode} from "../../../../wave-binder/wvb/lib/wvb/node";


@Injectable({
	providedIn: 'root'
})
export class WaveBinderManagerService {
	public waveBinder: WaveBinder;

	constructor() {
		let map = new Map<string, any>;
		map.set("RETRIEVE_DATA",
			{
				"target": "http://localhost:3000/country",
				"secure": false,
				"authorization": null,
				"headers": {}
			})
		this.waveBinder = new WaveBinder(PROTO_NODES, map);
		this.waveBinder.tangleNodes()
	}

	setValue(value: any, name: string) {
		this.waveBinder.getNodeByName(name).next(value)
	}

	getNode(name: string) {
		return this.waveBinder.getNodeByName(name)
	}

	getChoices(name: string) {
		let node = this.getNode(name) as MultiNode;
		return node.choices
	}

	getNodeValue(name: string) {
		return this.getNode(name).getNodeValue()
	}

}


const PROTO_NODES: any[] = [
	{
		"name": "departingCountry",
		"type": "MULTI",
		"path": "/departingCountry/name",
		"la": {
			"type": "GET",
			"addr": "/list",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": []
	},
	{
		"name": "calculateBasedOnTime",
		"type": "SINGLE",
		"path": "/calculateBasedOnTime",
		"la": {
			"type": "USER_SELECTION",
		},
		"dep": []
	},
	{
		"name": "arrivingCountry",
		"type": "MULTI",
		"path": "/arrivingCountry/name",
		"la": {
			"type": "GET",
			"addr": "/list",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": []
	},
	{
		"name": "departingCapital",
		"type": "SINGLE",
		"path": "/departingCountry/capital",
		"la": {
			"type": "GET",
			"addr": "/capital/{country}",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": [{
			"nodeName": "departingCountry",
			"parameterName": "country",
			"isOptional": false,
			"onUpdate": true,
			"type": "PATH_VARIABLE"
		}]
	},
	{
		"name": "arrivingCapital",
		"type": "SINGLE",
		"path": "/arrivingCountry/capital",
		"la": {
			"type": "GET",
			"addr": "/capital/{country}",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": [{
			"nodeName": "arrivingCountry",
			"parameterName": "country",
			"isOptional": false,
			"onUpdate": true,
			"type": "PATH_VARIABLE"
		}]
	},
	{
		"name": "departingPopulation",
		"type": "SINGLE",
		"path": "/departingCountry/population",
		"la": {
			"type": "GET",
			"addr": "/population/{country}",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": [{
			"nodeName": "departingCountry",
			"parameterName": "country",
			"isOptional": false,
			"onUpdate": true,
			"type": "PATH_VARIABLE"
		}]
	},
	{
		"name": "arrivingPopulation",
		"type": "SINGLE",
		"path": "/arrivingCountry/population",
		"la": {
			"type": "GET",
			"addr": "/population/{country}",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": [{
			"nodeName": "arrivingCountry",
			"parameterName": "country",
			"isOptional": false,
			"onUpdate": true,
			"type": "PATH_VARIABLE"
		}]
	},
	{
		"name": "departingCoordinates",
		"type": "SINGLE",
		"path": "/departingCountry/population",
		"la": {
			"type": "GET",
			"addr": "/coordinates/{country}",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": [{
			"nodeName": "departingCountry",
			"parameterName": "country",
			"isOptional": false,
			"onUpdate": true,
			"type": "PATH_VARIABLE"
		}]
	},
	{
		"name": "arrivingCoordinates",
		"type": "SINGLE",
		"path": "/arrivingCountry/coordinates",
		"la": {
			"type": "GET",
			"addr": "/coordinates/{country}",
			"serviceName": "RETRIEVE_DATA"
		},
		"dep": [{
			"nodeName": "arrivingCountry",
			"parameterName": "country",
			"isOptional": false,
			"onUpdate": true,
			"type": "PATH_VARIABLE"
		}]
	},
	{
		"name": "distance",
		"type": "SINGLE",
		"path": "/distance",
		"la": {
			"type": "POST",
			"addr": "/distance",
			"serviceName": "RETRIEVE_DATA",
			"bodyType": "JSON_OBJECT"
		},
		"dep": [
			{
				"nodeName": "departingCoordinates",
				"parameterName": "departingCoordinates",
				"isOptional": false,
				"onUpdate": true,
				"type": "BODY"
			},
			{
				"nodeName": "arrivingCoordinates",
				"parameterName": "arrivingCoordinates",
				"isOptional": false,
				"onUpdate": true,
				"type": "BODY"
			}
		]
	},
	{
		"name": "calculateBasedOnTime",
		"type": "SINGLE",
		"path": "/calculateBasedOnTime",
		"la": {
			"type": "USER_SELECTION",
		},
		"dep": []
	},
	{
		"name": "travelSpeed",
		"type": "SINGLE",
		"path": "/travelSpeed",
		"la": {
			"type": "USER_SELECTION",
		},
		"dep": []
	},
	{
		"name": "travelTime",
		"type": "SINGLE",
		"path": "/travelTime",
		"la": {
			"type": "POST",
			"addr": "/time",
			"serviceName": "RETRIEVE_DATA",
			"bodyType": "JSON_OBJECT"
		},
		"dep": [
			{
				"nodeName": "distance",
				"parameterName": "distance",
				"isOptional": false,
				"onUpdate": true,
				"type": "BODY"
			},
			{

				"nodeName": "travelSpeed",
				"parameterName": "speed",
				"isOptional": false,
				"onUpdate": true,
				"type": "BODY"
			}
		]
	},
	{
		"name": "actions",
		"type": "SINGLE",
		"path": "/actions",
		"la": {
			"type": "GET",
			"addr": "/actions/{speed}",
			"serviceName": "RETRIEVE_DATA",
		},
		"dep": [
			{
				"nodeName": "travelSpeed",
				"parameterName": "speed",
				"isOptional": false,
				"onUpdate": true,
				"type": "PATH_VARIABLE"
			}
		]
	},
	{
		"name": "faceExpression",
		"type": "SINGLE",
		"path": "/faceExpression",
		"la": {
			"type": "GET",
			"addr": "/faceExpression/{speed}",
			"serviceName": "RETRIEVE_DATA",
		},
		"dep": [
			{
				"nodeName": "travelSpeed",
				"parameterName": "speed",
				"isOptional": false,
				"onUpdate": true,
				"type": "PATH_VARIABLE"
			}
		]
	},
	{
		"name": "countryList",
		"type": "LIST",
		"path": "/countryList",
		"la": {
			"type": "USER_SELECTION"
		},
		"dep": [],
		"defaultValue": 1,
		"proto": {
			"name": "countryObj",
			"type": "MULTI",
			"path": "/region",
			"la": {
				"type": "GET",
				"addr": "/countryList",
				"serviceName": "RETRIEVE_DATA"
			},
			"dep": []
		}
	},
	{
		"name": "distances",
		"type": "LIST",
		"path": "/distances",
		"la": {
			"type": "USER_SELECTION",
		},
		"dep": [],
		"proto": {
			"name": "distanceElement",
			"type": "SINGLE",
			"path": "/distanceElement",
			"la": {
				"type": "POST",
				"addr": "/distanceElement",
				"serviceName": "RETRIEVE_DATA",
				"bodyType": "JSON_OBJECT"
			},
			"dep": [
				{
					"nodeName": "countryObj*",
					"parameterName": "departure",
					"isOptional": false,
					"onUpdate": true,
					"type": "BODY",
					"namingResolvingRule": {
						"type": "SAME_INDEX",
						"char": "*"
					}
				},
				{
					"nodeName": "countryObj$",
					"parameterName": "arriving",
					"isOptional": false,
					"onUpdate": true,
					"type": "BODY",
					"namingResolvingRule": {
						"type": "ALMOST_SAME_INDEX",
						"char": "$",
						"value": 1
					}
				}
			]
		}
	},
	{
		"name": "timeList",
		"type": "LIST",
		"path": "/timeList",
		"la": {
			"type": "USER_SELECTION",
		},
		"dep": [],
		"proto":{
			"name": "timeElement",
			"type": "SINGLE",
			"path": "/timeElement",
			"la": {
				"type": "POST",
				"addr": "/time",
				"serviceName": "RETRIEVE_DATA",
				"bodyType": "JSON_OBJECT"
			},
			"dep": [
				{
					"nodeName": "distanceElement*",
					"parameterName": "distance",
					"isOptional": false,
					"onUpdate": true,
					"type": "BODY",
					"namingResolvingRule": {
						"type": "SAME_INDEX",
						"char": "*"
					}
				},
				{

					"nodeName": "travelSpeed",
					"parameterName": "speed",
					"isOptional": false,
					"onUpdate": true,
					"type": "BODY"
				}
			]
		}
	},


];


