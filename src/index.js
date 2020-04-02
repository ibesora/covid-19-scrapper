// @flow
"use strict";
const Controller = require("./controller");
const fs = require("fs");
const moment = require("moment");

(async () => {

	try {

		//Controller.processGencatData();
		// await Controller.fetchAndSaveAreesBasiques();
		// await Controller.fetchAndSavePCRTotals();
		// await Controller.fetchAndSavePCRBySex();
		// await Controller.fetchAndSaveFrotis();
		// await Controller.fetchAndSavePCRVariation();
		// await Controller.fetchAndSavePCRByAgeRange();
		// await Controller.fetchPCRByCity();

		const date = moment("2020-03-01");
		const maxDate = moment("2020-03-31");
		while (date <= maxDate) {

			const data = fs.readFileSync(`./data/casosPerMunicipi-${date.format("YYYY-MM-DD")}.geojson`, "utf8");
			const obj = JSON.parse(data);
			console.log(date.format("YYYY-MM-DD"), obj.features.map(f => f.properties.name).join(", "));
			date.add(1, "day");

		}

	} catch (e) {

		// Deal with the fact the chain failed
		console.log(e.message);
		console.log(e.stack);

	}

})();

