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

			areesBasiques[index].cases = value === "NaN" ? -1 : value;

		});

		geographies.themes[0].indicators[0].associates[1].values.forEach((value, index) => {

			areesBasiques[index].value = value === "NaN" ? -1 : value;

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

			const range = /\+$/i.test(e.C[0]) ? [e.C[0].split(" ")[0]] : e.C[0].split("-");
			return {
				min: Number(range[0]),
				max: range.length > 1 ? Number(range[1]) : "",
				negative: e.C[2]
			};

		});

	},
	convertPCRByCityFromResponse: (data) => {

		const dataByComarcaAndCity = {};
		let previousCityData = {};
		data.forEach((d, index) => {

			const valueDicts = d.results[0].result.data.dsr.DS[0].ValueDicts["D0"];
			let data;
			if (index === 0) {

				data = d.results[0].result.data.dsr.DS[0].PH[1]["DM1"];

			} else {

				data = d.results[0].result.data.dsr.DS[0].PH[0]["DM1"];

			}

			data.forEach((comarca) => {

				const name = comarca["G0"];
				let dataByCity = {};
				if (dataByComarcaAndCity[name]) {

					dataByCity = dataByComarcaAndCity[name];

				}

				const cities = comarca.M[comarca.M.length - 1]["DM3"];
				if (!cities) {

					console.log("!!!!!!!!!!! NO DM3");

				} else {

					cities.forEach((city) => {

						const cityData = city.C;
						const name = typeof cityData[0] === "number" ? valueDicts[cityData[0]] : cityData[0];

						let cityDataToStore = {};

						if (cityData.length === 3) {

							cityDataToStore = { name, negative: cityData[1], positive: cityData[2] };

						} else if (cityData.length === 1 && city.R === 6) {

							cityDataToStore = { name, negative: previousCityData.negative, positive: previousCityData.positive };

						} else if (cityData.length === 2 && city.R === 4) {

							cityDataToStore = { name, negative: cityData[1], positive: previousCityData.positive };

						} else if (cityData.length === 2 && city.R === 2) {

							cityDataToStore = { name, negative: previousCityData.negative, positive: cityData[1] };

						}
						dataByCity[name] = cityDataToStore;
						previousCityData = cityDataToStore;

					});

					dataByComarcaAndCity[name] = dataByCity;

				}

			});

		});

		const result = [];
		const comarques = Object.keys(dataByComarcaAndCity);
		comarques.forEach((comarca) => {

			const municipis = Object.keys(dataByComarcaAndCity[comarca]);
			municipis.forEach(m => {

				result.push(dataByComarcaAndCity[comarca][m]);

			});

		});

		return result;

	}

}
;
