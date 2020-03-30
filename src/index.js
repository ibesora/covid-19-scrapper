// @flow
"use strict";
const Controller = require("./controller");

(async () => {

	try {

		await Controller.fetchAndSaveAreesBasiques();
		await Controller.fetchAndSavePCRTotals();
		await Controller.fetchAndSavePCRBySex();
		await Controller.fetchAndSaveFrotis();
		await Controller.fetchAndSavePCRVariation();
		await Controller.fetchAndSavePCRByAgeRange();
		await Controller.fetchPCRByCity();

	} catch (e) {

		// Deal with the fact the chain failed
		console.log(e.message);
		console.log(e.stack);

	}

})();

