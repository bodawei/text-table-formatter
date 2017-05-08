# text-table-formatter

## Introduction

This is a simple routine which will generate a table of values. There are a lot of other npm modules out there which will produce tables from output, many of which are much more sophisticated than this, so include them in your investigation for suitable tools.

Example output:

```
┌──────┬───────────┬───────────┬──────────┬─────────┬────────────┬────────────┐
│ 100% │ Chrome    │ 57.0.2987 │ Mac OS X │ 10.12.4 │ 2560/2579l │ 1422/1438b │
│ 100% │ Firefox   │ 52.0.0    │ Mac OS X │ 10.12.0 │ 2560/2579l │ 1422/1438b │
│ 100% │ node      │  6.8.0    │ Darwin   │ 16.5.0  │ 2500/2519l │ 1398/1414b │
│ 100% │ Opera     │ 44.0.2510 │ Mac OS X │ 10.12.4 │ 2560/2579l │ 1422/1438b │
│ 100% │ PhantomJS │  2.1.1    │ Mac OS X │  0.0.0  │ 2560/2579l │ 1422/1438b │
│ 100% │ Safari    │ 10.1.0    │ Mac OS X │ 10.12.4 │ 2560/2579l │ 1422/1438b │
└──────┴───────────┴───────────┴──────────┴─────────┴────────────┴────────────┘
```


## Installation

1. `npm install --save-dev text-table-formatter`

## Usage

Imagine you have an array of data you want to display:

```
   const myData = [{
      percent: 100,
      browser: 'Chrome',
      version: '57.0.2987'
   }, {
      percent: 100,
      browser: 'Firefox',
      version: '52.0.0'
   }, {
      percent: 100,
      browser: 'node',
      version: '6.8.0'
   }]

```
To show it in a table, then do the following, passing in information about how to extract the data for each column of the table.

```
const table = require('text-table-formatter');

const tableString = table(myData, {
   columns: [{
      propName: 'percent',
      unit: '%'
   }, {
      propName: 'browser',
   }, {
      propName: 'version',
      alignChar: '.'
   }]
});

console.log(tableString);
```

Note: The set of features in this is pretty small at the moment. It is merely sufficient for my current needs. Feel welcomed to fork this or contribute changes back!

## Legalness
Copyright 2017 柏大衛

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
