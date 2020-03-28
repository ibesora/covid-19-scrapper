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

	}

}
;
