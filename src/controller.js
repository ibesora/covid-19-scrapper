// @flow
"use strict";
const fs = require("fs");
const moment = require("moment");
const Scrapper = require("./scrapper");
const DataConverter = require("./dataConverter");

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

module.exports = {
	fetchAndSaveAreesBasiques: async () => {

		const ABSResponse = await Scrapper.fetchAreesBasiques();
		const ABS = DataConverter.convertAreesBasiquesFromResponse(ABSResponse);
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-areesBasiques.json`, JSON.stringify(ABS));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-areesBasiques.csv`, exportObjectToCSV(ABS));

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
