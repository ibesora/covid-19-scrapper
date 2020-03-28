"use strict";

require("flow-remove-types/register");
const test = require("tap").test;
const LatLon = require("../../src/common/geo/latlon");

test("LatLon", (t) => {
	t.test("#constructor", (t) => {
		t.ok(new LatLon(0, 0) instanceof LatLon, "creates an object");
		t.throws(() => {
			/*eslint no-new: 0*/
			new LatLon("foo", 0);
		}, "Invalid LatLon object: (foo, 0)", "detects and throws on invalid input");
		t.throws(() => {
			/*eslint no-new: 0*/
			new LatLon(-91, 0);
		}, "Invalid LatLon value: Latitude must be between -90 and 90 and Longitude must be between -180 and 180", "detects and throws on invalid input 1");
		t.throws(() => {
			/*eslint no-new: 0*/
			new LatLon(91, 0);
		}, "Invalid LatLon value: Latitude must be between -90 and 90 and Longitude must be between -180 and 180", "detects and throws on invalid input 2");
		t.throws(() => {
			/*eslint no-new: 0*/
			new LatLon(0, -181);
		}, "Invalid LatLon value: Latitude must be between -90 and 90 and Longitude must be between -180 and 180", "detects and throws on invalid input 3");
		t.throws(() => {
			/*eslint no-new: 0*/
			new LatLon(0, 181);
		}, "Invalid LatLon value: Latitude must be between -90 and 90 and Longitude must be between -180 and 180", "detects and throws on invalid input 4");
		t.end();
	});

	t.test("#toString", (t) => {
		t.equal(new LatLon(10, 20).toString(), "LatLon(10, 20)");
		t.end();
	});

	t.end();
});
