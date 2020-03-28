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
		const FrotisResultsResponse = await Scrapper.fetchFrotisResults();
		const FrotisResults = DataConverter.convertFrotisFromResponse(FrotisResultsResponse);
		const PCRVarPerDateResponse = await Scrapper.fetchPCRVarPerDate();
		const PCRByAgeRangeResponse = await Scrapper.fetchPCRByAgeRange();
		const PCRByAgeRange = DataConverter.convertPCRByAgeFromResponse(PCRByAgeRangeResponse);
		console.log(PCRByAgeRange);

	} catch (e) {

		// Deal with the fact the chain failed
		console.log(e.message);

	}

})();

