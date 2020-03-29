// @flow
"use strict";
const fs = require("fs");
const moment = require("moment");
const Scrapper = require("./scrapper");
const DataConverter = require("./dataConverter");
const areesBasiquesGeom = require("./areesBasiquesGeom.json");

const exportObjectToCSV = (input) => {

	let obj = input;
	if (!Array.isArray(input)) {

		obj = [input];

	}
	const keys = Object.keys(obj[0]);
	const rows = [ keys.map(k => `"${k}"`).join(",") ];
	obj.forEach(e => {

		const rowValues = keys.map(key => e[key]);
		rows.push(rowValues.join(","));

	});
	return rows.join("\n");

};

const exportObjectToGeoJSON = (input) => {

	const inputById = input.reduce((agg, el) => {

		agg[el.id] = el; return agg;

	}, {});
	const geomById = areesBasiquesGeom.features.reduce((agg, el) => {

		agg[el.properties.CODIABS] = el; return agg;

	}, {});

	const geojson = {
		type: "FeatureCollection",
		name: "areesBasiques",
		crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::25831" } },
		features: []
	};

	Object.keys(inputById).forEach(key => {

		const current = inputById[key];
		const geom = geomById[key];
		geojson.features.push({
			type: "Feature",
			properties: {
				...current,
				CODISS: geom.properties.CODISS,
				NOMSS: geom.properties.NOMSS,
				CODIRS: geom.properties.CODIRS,
				NOMRS: geom.properties.NOMRS,
				CODIAGA: geom.properties.CODIAGA,
				NOMAGA: geom.properties.NOMAGA,
			},
			geometry: geom.geometry
		});

	});

	return geojson;

};

module.exports = {
	fetchAndSaveAreesBasiques: async () => {

		const ABSResponse = await Scrapper.fetchAreesBasiques();
		const ABS = DataConverter.convertAreesBasiquesFromResponse(ABSResponse);
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-areesBasiques.json`, JSON.stringify(ABS));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-areesBasiques.csv`, exportObjectToCSV(ABS));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-areesBasiques.geojson`, JSON.stringify(exportObjectToGeoJSON(ABS)));

	},
	fetchAndSavePCRTotals: async () => {

		const PCRTotalsResponse = await Scrapper.fetchPCRTotals();
		const PCRTotals = DataConverter.convertPCRTotalsFromResponse(PCRTotalsResponse);
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-PCRTotals.json`, JSON.stringify(PCRTotals));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-PCRTotals.csv`, exportObjectToCSV(PCRTotals));

	},
	fetchAndSavePCRBySex: async () => {

		const PCRBySexResponse = await Scrapper.fetchPCRBySex();
		const PCRBySex = DataConverter.convertPCRBySexFromResponse(PCRBySexResponse);
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-PCRBySex.json`, JSON.stringify(PCRBySex));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-PCRBySex.csv`, exportObjectToCSV(PCRBySex));

	},
	fetchAndSaveFrotis: async () => {

		const FrotisResultsResponse = await Scrapper.fetchFrotisResults();
		const FrotisResults = DataConverter.convertFrotisFromResponse(FrotisResultsResponse);
		fs.writeFileSync("./data/frotis.json", JSON.stringify(FrotisResults));
		fs.writeFileSync("./data/frotis.csv", exportObjectToCSV(FrotisResults));

	},
	fetchAndSavePCRVariation: async () => {

		const PCRVarPerDateResponse = await Scrapper.fetchPCRVarPerDate();
		const PCRVarPerDate = DataConverter.convertPCRVarPerDateFromResponse(PCRVarPerDateResponse);
		fs.writeFileSync("./data/PCRVariation.json", JSON.stringify(PCRVarPerDate));
		fs.writeFileSync("./data/PCRVariation.csv", exportObjectToCSV(PCRVarPerDate));

	},
	fetchAndSavePCRByAgeRange: async () => {

		const PCRByAgeRangeResponse = await Scrapper.fetchPCRByAgeRange();
		const PCRByAgeRange = DataConverter.convertPCRByAgeFromResponse(PCRByAgeRangeResponse);
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-PCRByAgeRange.json`, JSON.stringify(PCRByAgeRange));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-PCRByAgeRange.csv`, exportObjectToCSV(PCRByAgeRange));

	}
}
;
