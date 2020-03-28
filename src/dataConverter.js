// @flow
"use strict";

module.exports = {

	convertAreesBasiquesFromResponse: (data) => {

		const geographies = data.geographies[0];
		const areesBasiques = geographies.features.map((el) => {

			return {	name: el.name	};

		});

		geographies.themes[0].indicators[0].values.forEach((value, index) => {

			areesBasiques[index].value = value;

		});

		geographies.themes[0].indicators[0].associates[1].values.forEach((value, index) => {

			areesBasiques[index].cases = value;

		});
		return areesBasiques;

	},

	convertPCRTotalsFromResponse: (data) => {

		const negative = data.results[0].result.data.dsr.DS[0].PH[0]["DM0"][0].C[1];
		const positive = data.results[0].result.data.dsr.DS[0].PH[0]["DM0"][1].C[1];

		return {
			negative,
			positive,
			total: negative + positive

		};

	}

}
;
