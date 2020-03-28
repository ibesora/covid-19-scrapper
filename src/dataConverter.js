// @flow
"use strict";
const moment = require("moment");

module.exports = {

	convertAreesBasiquesFromResponse: (data) => {

		const geographies = data.geographies[0];
		const areesBasiques = geographies.features.map((el) => {

			return {id: el.id,	name: el.name	};

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
			positive
		};

	},
	convertPCRBySexFromResponse: (data) => {

		const femalePositive = data.results[0].result.data.dsr.DS[0].PH[0]["DM0"][0].X[0]["M0"];
		const malePositive = data.results[0].result.data.dsr.DS[0].PH[0]["DM0"][0].X[1]["M0"];
		const femaleNegative = data.results[0].result.data.dsr.DS[0].PH[0]["DM0"][1].X[0]["M0"];
		const maleNegative = data.results[0].result.data.dsr.DS[0].PH[0]["DM0"][1].X[1]["M0"];

		return {
			femalePositive,
			malePositive,
			femaleNegative,
			maleNegative

		};

	},
	convertFrotisFromResponse: (data) => {

		return data.results[0].result.data.dsr.DS[0].PH[0]["DM0"].map((e) => {

			return {
				timestamp: e["G0"],
				date: moment.unix(e["G0"] / 1000).format("YYYY-MM-DD"),
				negative: e.X[0]["M0"],
				positive: e.X[1]["M0"]
			};

		});

	},
	convertPCRVarPerDateFromResponse: (data) => {

		return data.results[0].result.data.dsr.DS[0].PH[0]["DM0"].map((e) => {

			return {
				timestamp: e.C[0],
				date: moment.unix(e.C[0] / 1000).format("YYYY-MM-DD"),
				variation: e.C[1]
			};

		});

	},
	convertPCRByAgeFromResponse: (data) => {

		return data.results[0].result.data.dsr.DS[0].PH[0]["DM0"].map((e) => {

			const range = e.C[0].split("-");
			return {
				min: Number(range[0]),
				max: Number(range[1]),
				positive: e.C[1],
				negative: e.C[2]
			};

		});

	}

}
;
