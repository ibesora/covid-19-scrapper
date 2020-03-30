// @flow
"use strict";
const fs = require("fs");
const moment = require("moment");
const Scrapper = require("./scrapper");
const DataConverter = require("./dataConverter");
const areesBasiquesGeom = require("./areesBasiquesGeom.json");
const municipisGeom = require("./municipisGeom.json");

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

const exportAreesBasiquesToGeoJSON = (input) => {

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

const transformCityName = (name) => {

	if (name === "Saus Camallera i Llampaies") {

		return "Saus, Camallera i Llampaies";

	} else if (name === "Vinyols i  els Arcs") {

		return "Vinyols i els Arcs";

	} else if (name === "Calonge i Sant Antoni") {

		return "Calonge";

	} else if (name === "Cruïlles Monells i Sant Sadurní de l'Heura") {

		return "Cruïlles, Monells i Sant Sadurní de l'Heura";

	} else if (name === "Catellví de Rosanes") {

		return "Castellví de Rosanes";

	} else if (name === "Sant Adrià del Besòs") {

		return "Sant Adrià de Besòs";

	} else if (name === "Mortellà i Martinet") {

		return "Montellà i Martinet";

	} else if (name === "Torres del Segre") {

		return "Torres de Segre";

	} else if (name === "Fogars de Tordera") {

		return "Fogars de la Selva";

	} else if (name === "Roda de Berà") {

		return "Roda de Barà";

	} else if (name === "Vespella") {

		return "Vespella de Gaià";

	} else if (name === "Santa Perpétua de Mogoda") {

		return "Santa Perpètua de Mogoda";

	}

	return name;

};

const exportPCRByCityToGeoJSON = (input) => {

	const geomByName = municipisGeom.features.reduce((agg, el) => {

		agg[el.properties.nom_muni.toLowerCase()] = el; return agg;

	}, {});

	const geojson = {
		type: "FeatureCollection",
		name: "municipis",
		crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::25831" } },
		features: []
	};

	const municipisInPlace = {};
	input.forEach(city => {

		const name = transformCityName(city.name).toLowerCase();

		const geom = geomByName[name];

		if (!geom) {

			console.log("!!!!!!!!!!!!!!!!!!!!!", name, "not found");

		} else {

			municipisInPlace[geom.properties.municipi] = true;
			geojson.features.push({
				type: "Feature",
			  properties: {
					...city
				},
				geometry: geom.geometry
			});

		}

	});

	console.log(municipisInPlace);
	// Add missing geometries
	municipisGeom.features.forEach((el) => {

		if (!municipisInPlace[el.properties.municipi]) {

			console.log(el.properties.municipi, "not found, adding with 0s");

			geojson.features.push({
				type: "Feature",
			  properties: {
					name: el.properties.nom_muni,
					positive: 0,
					negative: 0
				},
				geometry: el.geometry
			});

		}

	});


	return geojson;

};

module.exports = {
	fetchAndSaveAreesBasiques: async () => {

		const ABSResponse = await Scrapper.fetchAreesBasiques();
		const ABS = DataConverter.convertAreesBasiquesFromResponse(ABSResponse);
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-areesBasiques.json`, JSON.stringify(ABS));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-areesBasiques.csv`, exportObjectToCSV(ABS));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-areesBasiques.geojson`, JSON.stringify(exportAreesBasiquesToGeoJSON(ABS)));

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

	},
	fetchPCRByCity: async () => {

		const PCRByCityResponse = await Scrapper.fetchPCRByCity();
		const PCRByCity = DataConverter.convertPCRByCityFromResponse(PCRByCityResponse);
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-PCRByCity.json`, JSON.stringify(PCRByCity));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-PCRByCity.csv`, exportObjectToCSV(PCRByCity));
		fs.writeFileSync(`./data/${moment().format("YYYY-MM-DD")}-PCRByCity.geojson`, JSON.stringify(exportPCRByCityToGeoJSON(PCRByCity)));

	}
}
;
