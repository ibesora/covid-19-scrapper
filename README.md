# covid-19-scrapper

This script fetches the data shown in the [SARS-CoV-2 dashboard](http://aquas.gencat.cat/ca/actualitat/ultimes-dades-coronavirus) and exports it in ``csv`` and ``json`` formats.

## Instructions

Just run the following instructions on the root folder
```
npm install
npm run start
```

All files will be created on the ``/data/`` folder.
Daily files are available in [this](https://github.com/ibesora/covid-19-data) repository

## Available data
| File name | description |
-----|----
areesBasiques | This file contains a list of all "Arees bàsiques de salut". Each element has the following attributes <ul><li><b>id</b>: Identifier</li><li><b>name</b>: Name</li><li><b>value</b>: Rates standarized by sex and age</li><li><b>cases</b>: Number of cases</li></ul> <b>Note:</b> <b>value</b> and <b>cases</b> are sometimes invalid in the source data. When that happens a value of -1 is set. <br /> Elements of the GeoJSON version of this file also contains, in addition to the geometry of each area, the following attributes:<ul><li><b>CODISS</b>: "Secció sanitària" identifier</li><li><b>NOMSS</b>: "Secció sanitària" name</li><li><b>CODIRS</b>: "Regió sanitària" identifier</li><li><b>NOMRS</b>: "Regió sanitària" name</li><li><b>CODIAGA</b>: "Arees de gestió assitencial" identifier</li><li><b>NOMAGA</b>: "Arees de gestió assitencial" name</li></ul> 
PCRByAgeRange | This file contains the number of cases by age range. Each element has the following attributes <ul><li><b>min</b>: Minimum age of the range</li><li><b>max</b>: Maximum age of the range</li><li><b>positive</b>: Number of positives</li><li><b>negative</b>: Number of negatives</li></ul>
PCRBySex | This file contains the number of cases per sex. Each element has the following attributes <ul><li><b>femalePositive</b>: Number of female positives</li><li><b>malePositive</b>: Number of male positives</li><li><b>femaleNegative</b>: Number of female negatives</li><li><b>maleNegative</b>: Number of male negatives</li></ul>
PCRTotals | This file contains the total number of cases. Each element has the following attributes <ul><li><b>negative</b>: Number of negatives</li><li><b>positive</b>: Number of positives</li></ul>
PCRVariation | This file contains the variation of the number of cases since the beginning of the data. Each element has the following attributes <ul><li><b>timestamp</b>: A UNIX timestamp value</li><li><b>date</b>: The date in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format</li><li><b>variation</b>: The variation of cases from the previous day</li></ul>
frotis | This file contains the number of cases diagnosed by the smear method. Each element has the following attributes <ul><li><b>timestamp</b>: A UNIX timestamp value</li><li><b>date</b>: The date in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format</li><li><b>negative</b>: The negative cases</li><li><b>positive</b>: The positive cases</li></ul>