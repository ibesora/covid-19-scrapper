// @flow
"use strict";

const fetch = require("node-fetch");

module.exports = {

	fetchAreesBasiques: async () => {

		const res = await fetch("http://aquas.gencat.cat/web/.content/IntegradorServeis/mapa_covid/data.js", {"credentials":"include", "headers":{"accept":"application/json, text/javascript, */*; q=0.01", "accept-language":"ca,en;q=0.9,es;q=0.8", "cache-control":"no-cache", "pragma":"no-cache", "x-requested-with":"XMLHttpRequest"}, "referrer":"http://aquas.gencat.cat/.content/IntegradorServeis/mapa_covid/atlas.html", "referrerPolicy":"no-referrer-when-downgrade", "body":null, "method":"GET", "mode":"cors"});
		const goodChars = (await res.text()).substring(1);
		return await JSON.parse(goodChars);

	},

	fetchPCRTotals: async () => {

		const res = await fetch("https://wabi-north-europe-api.analysis.windows.net/public/reports/querydata?synchronous=true", {"credentials":"omit", "headers":{"accept":"application/json, text/plain, */*", "accept-language":"ca,en;q=0.9,es;q=0.8", "activityid":"18fb8fd8-81f2-4515-94f0-5264b8365674", "cache-control":"no-cache", "content-type":"application/json;charset=UTF-8", "pragma":"no-cache", "requestid":"afd5d49e-0976-a6d3-fda7-800456e29d72", "sec-fetch-dest":"empty", "sec-fetch-mode":"cors", "sec-fetch-site":"cross-site", "x-powerbi-resourcekey":"e9257068-548b-4e84-9597-737da35a8921"}, "referrer":"https://app.powerbi.com/view?r=eyJrIjoiZTkyNTcwNjgtNTQ4Yi00ZTg0LTk1OTctNzM3ZGEzNWE4OTIxIiwidCI6IjNiOTQyN2RjLWQzMGUtNDNiYy04YzA2LWZmNzI1MzY3NmZlYyIsImMiOjh9", "referrerPolicy":"no-referrer-when-downgrade", "body":"{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"d1\",\"Entity\":\"dTest\"},{\"Name\":\"m1\",\"Entity\":\"M_Mesures_TEST\"}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d1\"}},\"Property\":\"MicrobioResultDesc\"},\"Name\":\"dTest.MicrobioResultDesc\"},{\"Measure\":{\"Expression\":{\"SourceRef\":{\"Source\":\"m1\"}},\"Property\":\"Resultats PCR\"},\"Name\":\"M_Mesures_TEST.Resultats PCR\"}],\"Where\":[{\"Condition\":{\"Not\":{\"Expression\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d1\"}},\"Property\":\"MicrobioResultDesc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"null\"}}]]}}}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,1]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Top\":{}}},\"Version\":1}}}]},\"CacheKey\":\"{\\\"Commands\\\":[{\\\"SemanticQueryDataShapeCommand\\\":{\\\"Query\\\":{\\\"Version\\\":2,\\\"From\\\":[{\\\"Name\\\":\\\"d1\\\",\\\"Entity\\\":\\\"dTest\\\"},{\\\"Name\\\":\\\"m1\\\",\\\"Entity\\\":\\\"M_Mesures_TEST\\\"}],\\\"Select\\\":[{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d1\\\"}},\\\"Property\\\":\\\"MicrobioResultDesc\\\"},\\\"Name\\\":\\\"dTest.MicrobioResultDesc\\\"},{\\\"Measure\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"m1\\\"}},\\\"Property\\\":\\\"Resultats PCR\\\"},\\\"Name\\\":\\\"M_Mesures_TEST.Resultats PCR\\\"}],\\\"Where\\\":[{\\\"Condition\\\":{\\\"Not\\\":{\\\"Expression\\\":{\\\"In\\\":{\\\"Expressions\\\":[{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d1\\\"}},\\\"Property\\\":\\\"MicrobioResultDesc\\\"}}],\\\"Values\\\":[[{\\\"Literal\\\":{\\\"Value\\\":\\\"null\\\"}}]]}}}}}]},\\\"Binding\\\":{\\\"Primary\\\":{\\\"Groupings\\\":[{\\\"Projections\\\":[0,1]}]},\\\"DataReduction\\\":{\\\"DataVolume\\\":3,\\\"Primary\\\":{\\\"Top\\\":{}}},\\\"Version\\\":1}}}]}\",\"QueryId\":\"\",\"ApplicationContext\":{\"DatasetId\":\"cb0a4136-7a64-47f1-8270-be5320ef5bf3\",\"Sources\":[{\"ReportId\":\"34dedced-6c95-4e56-83e5-26c024f7927b\"}]}}],\"cancelQueries\":[],\"modelId\":10535817}", "method":"POST", "mode":"cors"});
		return res.json();

	},

	fetchPCRBySex: async () => {

		const res = await fetch("https://wabi-north-europe-api.analysis.windows.net/public/reports/querydata?synchronous=true", {"credentials":"omit", "headers":{"accept":"application/json, text/plain, */*", "accept-language":"ca,en;q=0.9,es;q=0.8", "activityid":"18fb8fd8-81f2-4515-94f0-5264b8365674", "cache-control":"no-cache", "content-type":"application/json;charset=UTF-8", "pragma":"no-cache", "requestid":"3e2b159a-b0cc-a39e-b741-eac85e5e11ef", "sec-fetch-dest":"empty", "sec-fetch-mode":"cors", "sec-fetch-site":"cross-site", "x-powerbi-resourcekey":"e9257068-548b-4e84-9597-737da35a8921"}, "referrer":"https://app.powerbi.com/view?r=eyJrIjoiZTkyNTcwNjgtNTQ4Yi00ZTg0LTk1OTctNzM3ZGEzNWE4OTIxIiwidCI6IjNiOTQyN2RjLWQzMGUtNDNiYy04YzA2LWZmNzI1MzY3NmZlYyIsImMiOjh9", "referrerPolicy":"no-referrer-when-downgrade", "body":"{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"d1\",\"Entity\":\"dTest\"},{\"Name\":\"d2\",\"Entity\":\"dPersona\"},{\"Name\":\"m\",\"Entity\":\"M_Mesures_TEST\"}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d1\"}},\"Property\":\"MicrobioResultDesc\"},\"Name\":\"dTest.MicrobioResultDesc\"},{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d2\"}},\"Property\":\"Sex_Descripció\"},\"Name\":\"dPersona.Sex_Descripció\"},{\"Measure\":{\"Expression\":{\"SourceRef\":{\"Source\":\"m\"}},\"Property\":\"Resultats PCR\"},\"Name\":\"M_Mesures_TEST.Resultats PCR\"}],\"Where\":[{\"Condition\":{\"Not\":{\"Expression\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d1\"}},\"Property\":\"MicrobioResultDesc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"null\"}}]]}}}}}],\"OrderBy\":[{\"Direction\":2,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d1\"}},\"Property\":\"MicrobioResultDesc\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,2]}]},\"Secondary\":{\"Groupings\":[{\"Projections\":[1]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Top\":{}},\"Secondary\":{\"Top\":{}}},\"Version\":1}}}]},\"CacheKey\":\"{\\\"Commands\\\":[{\\\"SemanticQueryDataShapeCommand\\\":{\\\"Query\\\":{\\\"Version\\\":2,\\\"From\\\":[{\\\"Name\\\":\\\"d1\\\",\\\"Entity\\\":\\\"dTest\\\"},{\\\"Name\\\":\\\"d2\\\",\\\"Entity\\\":\\\"dPersona\\\"},{\\\"Name\\\":\\\"m\\\",\\\"Entity\\\":\\\"M_Mesures_TEST\\\"}],\\\"Select\\\":[{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d1\\\"}},\\\"Property\\\":\\\"MicrobioResultDesc\\\"},\\\"Name\\\":\\\"dTest.MicrobioResultDesc\\\"},{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d2\\\"}},\\\"Property\\\":\\\"Sex_Descripció\\\"},\\\"Name\\\":\\\"dPersona.Sex_Descripció\\\"},{\\\"Measure\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"m\\\"}},\\\"Property\\\":\\\"Resultats PCR\\\"},\\\"Name\\\":\\\"M_Mesures_TEST.Resultats PCR\\\"}],\\\"Where\\\":[{\\\"Condition\\\":{\\\"Not\\\":{\\\"Expression\\\":{\\\"In\\\":{\\\"Expressions\\\":[{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d1\\\"}},\\\"Property\\\":\\\"MicrobioResultDesc\\\"}}],\\\"Values\\\":[[{\\\"Literal\\\":{\\\"Value\\\":\\\"null\\\"}}]]}}}}}],\\\"OrderBy\\\":[{\\\"Direction\\\":2,\\\"Expression\\\":{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d1\\\"}},\\\"Property\\\":\\\"MicrobioResultDesc\\\"}}}]},\\\"Binding\\\":{\\\"Primary\\\":{\\\"Groupings\\\":[{\\\"Projections\\\":[0,2]}]},\\\"Secondary\\\":{\\\"Groupings\\\":[{\\\"Projections\\\":[1]}]},\\\"DataReduction\\\":{\\\"DataVolume\\\":3,\\\"Primary\\\":{\\\"Top\\\":{}},\\\"Secondary\\\":{\\\"Top\\\":{}}},\\\"Version\\\":1}}}]}\",\"QueryId\":\"\",\"ApplicationContext\":{\"DatasetId\":\"cb0a4136-7a64-47f1-8270-be5320ef5bf3\",\"Sources\":[{\"ReportId\":\"34dedced-6c95-4e56-83e5-26c024f7927b\"}]}}],\"cancelQueries\":[],\"modelId\":10535817}", "method":"POST", "mode":"cors"});
		return res.json();

	},

	fetchFrotisResults: async () => {

		const res = await fetch("https://wabi-north-europe-api.analysis.windows.net/public/reports/querydata?synchronous=true", {"credentials":"omit", "headers":{"accept":"application/json, text/plain, */*", "accept-language":"ca,en;q=0.9,es;q=0.8", "activityid":"18fb8fd8-81f2-4515-94f0-5264b8365674", "cache-control":"no-cache", "content-type":"application/json;charset=UTF-8", "pragma":"no-cache", "requestid":"48059e16-ef14-02cd-d4b5-9bf1c06f7b9e", "sec-fetch-dest":"empty", "sec-fetch-mode":"cors", "sec-fetch-site":"cross-site", "x-powerbi-resourcekey":"e9257068-548b-4e84-9597-737da35a8921"}, "referrer":"https://app.powerbi.com/view?r=eyJrIjoiZTkyNTcwNjgtNTQ4Yi00ZTg0LTk1OTctNzM3ZGEzNWE4OTIxIiwidCI6IjNiOTQyN2RjLWQzMGUtNDNiYy04YzA2LWZmNzI1MzY3NmZlYyIsImMiOjh9", "referrerPolicy":"no-referrer-when-downgrade", "body":"{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"d1\",\"Entity\":\"dTest\"},{\"Name\":\"d2\",\"Entity\":\"dData\"},{\"Name\":\"m\",\"Entity\":\"M_Mesures_TEST\"}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d1\"}},\"Property\":\"MicrobioResultDesc\"},\"Name\":\"dTest.MicrobioResultDesc\"},{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d2\"}},\"Property\":\"Data\"},\"Name\":\"dData.Data\"},{\"Measure\":{\"Expression\":{\"SourceRef\":{\"Source\":\"m\"}},\"Property\":\"Resultats PCR\"},\"Name\":\"M_Mesures_TEST.Resultats PCR\"}],\"Where\":[{\"Condition\":{\"Not\":{\"Expression\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d1\"}},\"Property\":\"MicrobioResultDesc\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"null\"}}]]}}}}},{\"Condition\":{\"Between\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d2\"}},\"Property\":\"Data\"}},\"LowerBound\":{\"DateSpan\":{\"Expression\":{\"DateAdd\":{\"Expression\":{\"DateAdd\":{\"Expression\":{\"Now\":{}},\"Amount\":1,\"TimeUnit\":0}},\"Amount\":-23,\"TimeUnit\":0}},\"TimeUnit\":0}},\"UpperBound\":{\"DateSpan\":{\"Expression\":{\"Now\":{}},\"TimeUnit\":0}}}}}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d2\"}},\"Property\":\"Data\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[1,2]}]},\"Secondary\":{\"Groupings\":[{\"Projections\":[0]}]},\"DataReduction\":{\"DataVolume\":4,\"Primary\":{\"Window\":{\"Count\":200}},\"Secondary\":{\"Top\":{\"Count\":60}}},\"Version\":1}}}]},\"CacheKey\":\"{\\\"Commands\\\":[{\\\"SemanticQueryDataShapeCommand\\\":{\\\"Query\\\":{\\\"Version\\\":2,\\\"From\\\":[{\\\"Name\\\":\\\"d1\\\",\\\"Entity\\\":\\\"dTest\\\"},{\\\"Name\\\":\\\"d2\\\",\\\"Entity\\\":\\\"dData\\\"},{\\\"Name\\\":\\\"m\\\",\\\"Entity\\\":\\\"M_Mesures_TEST\\\"}],\\\"Select\\\":[{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d1\\\"}},\\\"Property\\\":\\\"MicrobioResultDesc\\\"},\\\"Name\\\":\\\"dTest.MicrobioResultDesc\\\"},{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d2\\\"}},\\\"Property\\\":\\\"Data\\\"},\\\"Name\\\":\\\"dData.Data\\\"},{\\\"Measure\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"m\\\"}},\\\"Property\\\":\\\"Resultats PCR\\\"},\\\"Name\\\":\\\"M_Mesures_TEST.Resultats PCR\\\"}],\\\"Where\\\":[{\\\"Condition\\\":{\\\"Not\\\":{\\\"Expression\\\":{\\\"In\\\":{\\\"Expressions\\\":[{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d1\\\"}},\\\"Property\\\":\\\"MicrobioResultDesc\\\"}}],\\\"Values\\\":[[{\\\"Literal\\\":{\\\"Value\\\":\\\"null\\\"}}]]}}}}},{\\\"Condition\\\":{\\\"Between\\\":{\\\"Expression\\\":{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d2\\\"}},\\\"Property\\\":\\\"Data\\\"}},\\\"LowerBound\\\":{\\\"DateSpan\\\":{\\\"Expression\\\":{\\\"DateAdd\\\":{\\\"Expression\\\":{\\\"DateAdd\\\":{\\\"Expression\\\":{\\\"Now\\\":{}},\\\"Amount\\\":1,\\\"TimeUnit\\\":0}},\\\"Amount\\\":-23,\\\"TimeUnit\\\":0}},\\\"TimeUnit\\\":0}},\\\"UpperBound\\\":{\\\"DateSpan\\\":{\\\"Expression\\\":{\\\"Now\\\":{}},\\\"TimeUnit\\\":0}}}}}],\\\"OrderBy\\\":[{\\\"Direction\\\":1,\\\"Expression\\\":{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d2\\\"}},\\\"Property\\\":\\\"Data\\\"}}}]},\\\"Binding\\\":{\\\"Primary\\\":{\\\"Groupings\\\":[{\\\"Projections\\\":[1,2]}]},\\\"Secondary\\\":{\\\"Groupings\\\":[{\\\"Projections\\\":[0]}]},\\\"DataReduction\\\":{\\\"DataVolume\\\":4,\\\"Primary\\\":{\\\"Window\\\":{\\\"Count\\\":200}},\\\"Secondary\\\":{\\\"Top\\\":{\\\"Count\\\":60}}},\\\"Version\\\":1}}}]}\",\"QueryId\":\"\",\"ApplicationContext\":{\"DatasetId\":\"cb0a4136-7a64-47f1-8270-be5320ef5bf3\",\"Sources\":[{\"ReportId\":\"34dedced-6c95-4e56-83e5-26c024f7927b\"}]}}],\"cancelQueries\":[],\"modelId\":10535817}", "method":"POST", "mode":"cors"});
		return res.json();

	},
	fetchPCRVarPerDate: async () => {

		const res = await fetch("https://wabi-north-europe-api.analysis.windows.net/public/reports/querydata?synchronous=true", {"credentials":"omit", "headers":{"accept":"application/json, text/plain, */*", "accept-language":"ca,en;q=0.9,es;q=0.8", "activityid":"18fb8fd8-81f2-4515-94f0-5264b8365674", "cache-control":"no-cache", "content-type":"application/json;charset=UTF-8", "pragma":"no-cache", "requestid":"2dbe6828-9f6f-8e96-6af6-5fe28917b1d1", "sec-fetch-dest":"empty", "sec-fetch-mode":"cors", "sec-fetch-site":"cross-site", "x-powerbi-resourcekey":"e9257068-548b-4e84-9597-737da35a8921"}, "referrer":"https://app.powerbi.com/view?r=eyJrIjoiZTkyNTcwNjgtNTQ4Yi00ZTg0LTk1OTctNzM3ZGEzNWE4OTIxIiwidCI6IjNiOTQyN2RjLWQzMGUtNDNiYy04YzA2LWZmNzI1MzY3NmZlYyIsImMiOjh9", "referrerPolicy":"no-referrer-when-downgrade", "body":"{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"d\",\"Entity\":\"dData\"},{\"Name\":\"m\",\"Entity\":\"M_Mesures_TEST\"}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d\"}},\"Property\":\"Data\"},\"Name\":\"dData.Data\"},{\"Measure\":{\"Expression\":{\"SourceRef\":{\"Source\":\"m\"}},\"Property\":\"Resultats PCR Avui\"},\"Name\":\"M_Mesures_TEST.Resultats PCR Avui\"}],\"Where\":[{\"Condition\":{\"Between\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d\"}},\"Property\":\"Data\"}},\"LowerBound\":{\"DateSpan\":{\"Expression\":{\"DateAdd\":{\"Expression\":{\"DateAdd\":{\"Expression\":{\"Now\":{}},\"Amount\":1,\"TimeUnit\":0}},\"Amount\":-21,\"TimeUnit\":0}},\"TimeUnit\":0}},\"UpperBound\":{\"DateSpan\":{\"Expression\":{\"Now\":{}},\"TimeUnit\":0}}}}}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d\"}},\"Property\":\"Data\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,1]}]},\"DataReduction\":{\"DataVolume\":3,\"Primary\":{\"Top\":{}}},\"Version\":1}}}]},\"CacheKey\":\"{\\\"Commands\\\":[{\\\"SemanticQueryDataShapeCommand\\\":{\\\"Query\\\":{\\\"Version\\\":2,\\\"From\\\":[{\\\"Name\\\":\\\"d\\\",\\\"Entity\\\":\\\"dData\\\"},{\\\"Name\\\":\\\"m\\\",\\\"Entity\\\":\\\"M_Mesures_TEST\\\"}],\\\"Select\\\":[{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d\\\"}},\\\"Property\\\":\\\"Data\\\"},\\\"Name\\\":\\\"dData.Data\\\"},{\\\"Measure\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"m\\\"}},\\\"Property\\\":\\\"Resultats PCR Avui\\\"},\\\"Name\\\":\\\"M_Mesures_TEST.Resultats PCR Avui\\\"}],\\\"Where\\\":[{\\\"Condition\\\":{\\\"Between\\\":{\\\"Expression\\\":{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d\\\"}},\\\"Property\\\":\\\"Data\\\"}},\\\"LowerBound\\\":{\\\"DateSpan\\\":{\\\"Expression\\\":{\\\"DateAdd\\\":{\\\"Expression\\\":{\\\"DateAdd\\\":{\\\"Expression\\\":{\\\"Now\\\":{}},\\\"Amount\\\":1,\\\"TimeUnit\\\":0}},\\\"Amount\\\":-21,\\\"TimeUnit\\\":0}},\\\"TimeUnit\\\":0}},\\\"UpperBound\\\":{\\\"DateSpan\\\":{\\\"Expression\\\":{\\\"Now\\\":{}},\\\"TimeUnit\\\":0}}}}}],\\\"OrderBy\\\":[{\\\"Direction\\\":1,\\\"Expression\\\":{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d\\\"}},\\\"Property\\\":\\\"Data\\\"}}}]},\\\"Binding\\\":{\\\"Primary\\\":{\\\"Groupings\\\":[{\\\"Projections\\\":[0,1]}]},\\\"DataReduction\\\":{\\\"DataVolume\\\":3,\\\"Primary\\\":{\\\"Top\\\":{}}},\\\"Version\\\":1}}}]}\",\"QueryId\":\"\",\"ApplicationContext\":{\"DatasetId\":\"cb0a4136-7a64-47f1-8270-be5320ef5bf3\",\"Sources\":[{\"ReportId\":\"34dedced-6c95-4e56-83e5-26c024f7927b\"}]}}],\"cancelQueries\":[],\"modelId\":10535817}", "method":"POST", "mode":"cors"});
		return res.json();

	},
	fetchPCRByAgeRange: async () => {

		const res = await fetch("https://wabi-north-europe-api.analysis.windows.net/public/reports/querydata?synchronous=true", {"credentials":"omit", "headers":{"accept":"application/json, text/plain, */*", "accept-language":"ca,en;q=0.9,es;q=0.8", "activityid":"18fb8fd8-81f2-4515-94f0-5264b8365674", "cache-control":"no-cache", "content-type":"application/json;charset=UTF-8", "pragma":"no-cache", "requestid":"33185256-f24a-9f3f-7410-f4e34d4cabcb", "sec-fetch-dest":"empty", "sec-fetch-mode":"cors", "sec-fetch-site":"cross-site", "x-powerbi-resourcekey":"e9257068-548b-4e84-9597-737da35a8921"}, "referrer":"https://app.powerbi.com/view?r=eyJrIjoiZTkyNTcwNjgtNTQ4Yi00ZTg0LTk1OTctNzM3ZGEzNWE4OTIxIiwidCI6IjNiOTQyN2RjLWQzMGUtNDNiYy04YzA2LWZmNzI1MzY3NmZlYyIsImMiOjh9", "referrerPolicy":"no-referrer-when-downgrade", "body":"{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"d2\",\"Entity\":\"dRangEdad\"},{\"Name\":\"f\",\"Entity\":\"fMeasures\"},{\"Name\":\"m1\",\"Entity\":\"M_Mesures_TEST\"}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d2\"}},\"Property\":\"RangEdat\"},\"Name\":\"dRangEdad.RangEdat\"},{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"f\"}},\"Property\":\"Edat\"},\"Name\":\"fMeasures.Edat\"},{\"Measure\":{\"Expression\":{\"SourceRef\":{\"Source\":\"m1\"}},\"Property\":\"Resultats Negatius\"},\"Name\":\"M_Mesures_TEST.Resultats Negatius\"},{\"Measure\":{\"Expression\":{\"SourceRef\":{\"Source\":\"m1\"}},\"Property\":\"Resultats Positius\"},\"Name\":\"M_Mesures_TEST.Resultats Positius\"}],\"Where\":[{\"Condition\":{\"Not\":{\"Expression\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d2\"}},\"Property\":\"RangEdat\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"null\"}}]]}}}}}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"d2\"}},\"Property\":\"RangEdat\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,2,3]}]},\"DataReduction\":{\"DataVolume\":4,\"Primary\":{\"Window\":{\"Count\":1000}}},\"Version\":1}}}]},\"CacheKey\":\"{\\\"Commands\\\":[{\\\"SemanticQueryDataShapeCommand\\\":{\\\"Query\\\":{\\\"Version\\\":2,\\\"From\\\":[{\\\"Name\\\":\\\"d2\\\",\\\"Entity\\\":\\\"dRangEdad\\\"},{\\\"Name\\\":\\\"f\\\",\\\"Entity\\\":\\\"fMeasures\\\"},{\\\"Name\\\":\\\"m1\\\",\\\"Entity\\\":\\\"M_Mesures_TEST\\\"}],\\\"Select\\\":[{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d2\\\"}},\\\"Property\\\":\\\"RangEdat\\\"},\\\"Name\\\":\\\"dRangEdad.RangEdat\\\"},{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"f\\\"}},\\\"Property\\\":\\\"Edat\\\"},\\\"Name\\\":\\\"fMeasures.Edat\\\"},{\\\"Measure\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"m1\\\"}},\\\"Property\\\":\\\"Resultats Negatius\\\"},\\\"Name\\\":\\\"M_Mesures_TEST.Resultats Negatius\\\"},{\\\"Measure\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"m1\\\"}},\\\"Property\\\":\\\"Resultats Positius\\\"},\\\"Name\\\":\\\"M_Mesures_TEST.Resultats Positius\\\"}],\\\"Where\\\":[{\\\"Condition\\\":{\\\"Not\\\":{\\\"Expression\\\":{\\\"In\\\":{\\\"Expressions\\\":[{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d2\\\"}},\\\"Property\\\":\\\"RangEdat\\\"}}],\\\"Values\\\":[[{\\\"Literal\\\":{\\\"Value\\\":\\\"null\\\"}}]]}}}}}],\\\"OrderBy\\\":[{\\\"Direction\\\":1,\\\"Expression\\\":{\\\"Column\\\":{\\\"Expression\\\":{\\\"SourceRef\\\":{\\\"Source\\\":\\\"d2\\\"}},\\\"Property\\\":\\\"RangEdat\\\"}}}]},\\\"Binding\\\":{\\\"Primary\\\":{\\\"Groupings\\\":[{\\\"Projections\\\":[0,2,3]}]},\\\"DataReduction\\\":{\\\"DataVolume\\\":4,\\\"Primary\\\":{\\\"Window\\\":{\\\"Count\\\":1000}}},\\\"Version\\\":1}}}]}\",\"QueryId\":\"\",\"ApplicationContext\":{\"DatasetId\":\"cb0a4136-7a64-47f1-8270-be5320ef5bf3\",\"Sources\":[{\"ReportId\":\"34dedced-6c95-4e56-83e5-26c024f7927b\"}]}}],\"cancelQueries\":[],\"modelId\":10535817}", "method":"POST", "mode":"cors"});
		return res.json();

	}

};
