// @flow
"use strict";
const Scrapper = require("./scrapper");
const DataConverter = require("./dataConverter");

(async () => {

	try {

		const ABSResponse = await Scrapper.fetchAreesBàsiques();
		const ABS = DataConverter.convertAreesBasiquesFromResponse(ABSResponse);
		const PCRTotalsResponse = await Scrapper.fetchPCRTotals();
		const PCRTotals = DataConverter.convertPCRTotalsFromResponse(PCRTotalsResponse);
		const PCRBySexResponse = await Scrapper.fetchPCRBySex();
		const PCRBySex = DataConverter.convertPCRBySexFromResponse(PCRBySexResponse);
		console.log(PCRBySex);
		// const FrotisResults = await Scrapper.fetchFrotisResults();
		// const PCRVarPerDate = await Scrapper.fetchPCRVarPerDate();
		// const PCRByAgeRange = await Scrapper.fetchPCRByAgeRange();

	} catch (e) {

		// Deal with the fact the chain failed
		console.log(e.message);

	}

})();

