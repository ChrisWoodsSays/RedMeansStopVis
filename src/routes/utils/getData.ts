import { contourDensity, csv, json } from 'd3';
import _, { forEach, padStart } from 'lodash';
//import { bs4bRed, bs4bAmber, bs4bGreen } from 'colours.js';
const bs4bRed = "#e52421";
const bs4bAmber = "#ffd503";
const bs4bGreen = "#58b031";

import * as d3 from 'd3';
import moment from 'moment'

export async function getSurveys() {
	let surveys = await csv('./data/Red Means Stop Data Sep 2023 - Consoldiated Data.csv', (row:any) => {
		return {
			ID: row['Timestamp'],
			locationName: row['Location'],
			shortName: row['Short Name'],
			lat: +row['Latitude'],
			lon: +row['Longitude'],
			who: row['Who'],
			surveyDate: row['Survey Date'],
			minutesSurveyed: +row['Cleansed Minutes at Traffic Lights'],
			noOfLanes: +row['Number of lanes'],
			redCycleSecs: +row['RED LIGHT CYCLE IN SECS'],
			redCycleSecsMin: +row['Red Cycle Seconds Adjusted Min'],
			redCycleSecsMedian: +row['Red Cycle Seconds Adjusted Median'],
			redCycleSecsMax: +row['Red Cycle Seconds Adjusted Max'],
			noOfPhases: +row['How many red phases did you observe in your study?'],
			timeInRedCycle: +row['Time in Red Cycle (Secs)'],
			timeInRedCycleMin: +row['Time in Red Cycle (Secs, Min)'],
			timeInRedCycleMedian: +row['Time in Red Cycle (Secs, Median)'],
			timeInRedCycleMax: +row['Time in Red Cycle (Secs, Max)'],
			noOfJumpers: +row['How Many Drivers Jumped'],
			oneRedLightJumpedPerNMinutes: +row['One Red Light Jumped per <n> Minutes'], // Lower worse/ Higher better,
			minutesPerJump: 0,
			redLightsPerJump: 0,
			colourName: "",
			meaning: "",
			colourCode: "",
			lightColourName:"",
			lightColourCode:""
		}
	});

	surveys.forEach((l) => {
		l.who == "" ? "TBC" : l.who;
		l.minutesPerJump = Math.round((l.noOfJumpers > 0 ? l.minutesSurveyed / l.noOfJumpers : 40)*10)/10;
		l.redLightsPerJump = Math.round((l.noOfJumpers > 0 ? l.noOfPhases / l.noOfJumpers : 40)*10)/10;
		const categories = getCategory(l.redLightsPerJump);
		l.colourName = categories.colourName;
		l.meaning = categories.meaning;
		l.colourCode = categories.colourCode;
		l.lightColourName = categories.lightColourName;
		l.lightColourCode = categories.lightColourCode;
	})
	return surveys;
}

// Get counts by location (not period)
export function getCombinedLocations(surveys: []) {
	let combinedLocations = Object.entries(surveys
		.reduce(function (acc, { ID, shortName: shortName, lat, lon, surveyDate, noOfJumpers, noOfPhases, minutesSurveyed }) {
			acc[shortName] ??= { locationName: shortName, lat: lat, lon: lon, surveyDate: surveyDate, noOfJumpers: 0, noOfPhases: 0, minutesSurveyed: 0, surveyCount:0, minutesPerJump:0, redLightsPerJump:0, colourName:"", meaning:"", colourCode:""}; // create if it does not exist
			acc[shortName].noOfJumpers += noOfJumpers;
			acc[shortName].noOfPhases += noOfPhases;
			acc[shortName].minutesSurveyed += minutesSurveyed;
			acc[shortName].surveyCount++;
			
			return acc;
		}, {})
		)
		.map(([shortName, { lat, lon, surveyDate, noOfJumpers, noOfPhases, minutesSurveyed, surveyCount, minutesPerJump, redLightsPerJump, colourName, meaning, colourCode }]) => ({ shortName, lat, lon, surveyDate, noOfJumpers, noOfPhases, minutesSurveyed, surveyCount, minutesPerJump, redLightsPerJump, colourName, meaning, colourCode}));
	
	combinedLocations.forEach((l) => {
		l.minutesPerJump = Math.round((l.noOfJumpers > 0 ? l.minutesSurveyed / l.noOfJumpers : 40)*10)/10;
		l.redLightsPerJump = Math.round((l.noOfJumpers > 0 ? l.noOfPhases / l.noOfJumpers : 40)*10)/10;
		const categories = getCategory(l.redLightsPerJump);
		l.colourName = categories.lightColourName;
		l.meaning = categories.meaning;
		l.colourCode = categories.lightColourCode;
	})

	return combinedLocations;
}

// Get counts by location (not period)
export function getPeople(surveys: []) {
	let people = Object.entries(surveys
		.reduce(function (acc, { who, lat, lon, surveyDate, noOfJumpers, noOfPhases, minutesSurveyed }) {
			acc[who] ??= { who: who, lat: lat, lon: lon, surveyDate: surveyDate, noOfJumpers: 0, noOfPhases: 0, minutesSurveyed: 0, surveyCount:0, minutesPerJump:0, redLightsPerJump:0, colourName:"", meaning:"", colourCode:""}; // create if it does not exist
			acc[who].noOfJumpers += noOfJumpers;
			acc[who].noOfPhases += noOfPhases;
			acc[who].minutesSurveyed += minutesSurveyed;
			acc[who].surveyCount++;
			return acc;
		}, {})
		)
		.map(([who, { lat, lon, surveyDate, noOfJumpers, noOfPhases, minutesSurveyed, surveyCount, minutesPerJump, redLightsPerJump, colourName, meaning, colourCode }]) => ({ who, lat, lon, surveyDate, noOfJumpers, noOfPhases, minutesSurveyed, surveyCount, minutesPerJump, redLightsPerJump, colourName, meaning, colourCode}));
	
	people.forEach((l) => {
		l.minutesPerJump = Math.round((l.noOfJumpers > 0 ? l.minutesSurveyed / l.noOfJumpers : 40)*10)/10;
		l.redLightsPerJump = Math.round((l.noOfJumpers > 0 ? l.noOfPhases / l.noOfJumpers : 40)*10)/10;
		const categories = getCategory(l.redLightsPerJump);
		l.colourName = categories.lightColourName;
		l.meaning = categories.meaning;
		l.colourCode = categories.lightColourCode;
	})

	return people;
}

export function getCategoryFromID(id: number) {
	let colourName:string;
	let meaning:string;
	let colourCode:string;
	let lightColourName:string;
	let lightColourCode:string;
	
	if (id== 0) {
		colourName = "Red";
		meaning = "Every 19 minutes";
		colourCode = bs4bRed;//"#e52421"; // red
		lightColourName = "Red";
		lightColourCode = colourCode;
	} else 
		if (id == 1) {
			colourName = "Amber";
			meaning = "Every 31 minutes";
			colourCode = bs4bAmber;//"#ffd503"; // amber
			lightColourName = "Red";
			lightColourCode = bs4bRed; // red
		} else {
			colourName = "Green";
			meaning = "None";
			colourCode = bs4bGreen;//"#58b031"; // green
			lightColourName = "WhiteSmoke";
			lightColourCode = "#F5F5F5";
		}

	return ({colourName: colourName, colourCode: colourCode, meaning: meaning, lightColourName: lightColourName, lightColourCode: lightColourCode})
}
	

export function getCategory(redLightsPerJump: number) {
	let id: number;
	
	if (redLightsPerJump == 40) {
		id = 2 // Green
	} else 
		if (redLightsPerJump > 5) {
			id = 1; // amber
		} else {
			id = 0; //red
		}
	return getCategoryFromID(id);
}

export function getStopSignPoints(c: number, circleRadius: number, data:[], totalReqPoints: number, primaryColour: string, secondaryColour: string, yCentre: number ) {
	let points = [];
	for(let i = 0; i < totalReqPoints; i++){
		const colour = i < data.length ? primaryColour : secondaryColour;
		const thisDatum = i < data.length ?
			data[i] : [{shortName: "Empty"}];
		points.push(calcPhylloCoords(c, i, colour, circleRadius, thisDatum, yCentre));
	}
	return points;
}

function calcPhylloCoords(c: number, i: number, colour: string, circleRadius: number, data :[], yCentre: number) {
	
	let angle = i * 137.5;
	let radius = c * Math.sqrt(i);
	let x = radius * Math.cos(angle / 180);
	let y = radius * Math.sin(angle / 180);
	//let colour = radius < c * Math.sqrt(totalPoints) * colourSplit ? colours[0] : colours[1];
	return ({x: x, y: y, yCentre: yCentre, radius: circleRadius, colour: colour, data: data });
}

// export function centreNumber(number: number, fullWidth: number) {
// 	// currently hardcoded for overall length of 15
// 	let numAsString = Math.round(number*1).toLocaleString();
// 	return centreText(numAsString, fullWidth);
// }
