/**********************************************************************\
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
\**********************************************************************/

'use strict';

/* eslint-env node */
/* eslint-disable no-console */

/**********************************************************************\
 Given an array of data to be shown in a table, and a set of info about
 how to format it, return a string which contains a multi-lined
 table displaying the specified information.

 PARAMS:
    rowData: An array of objects, each one has data for one table row.
    options:
       column: (required) An array of descriptors for the columns.
          propName: The name of the property in a rowData object
          unit: (optional) any units to suffix to the data
          alignChar: (optional) a character to align the data on.
             (useful to align a column of numbers with fract values)
\**********************************************************************/
function formatTable(rowData, options) {
   const colDescriptors = options.column;

   // Compute the max width required for each column
   const colWidths = rowData.reduce((widths, entry) => {
      colDescriptors.forEach((desc) => {
         const value = entry[desc.propName].toString() + (desc.unit || '');
         const current = widths[desc.propName] || {};

         if (desc.alignChar) {
            const leftWidth = value.indexOf(desc.alignChar);
            const rightWidth = value.length - leftWidth;

            const left = Math.max(leftWidth, current.left || 0);
            const right = Math.max(rightWidth, current.right || 0);
            const col = Math.max(left + right, current.col || 0);

            widths[desc.propName] = { left, right, col };
         } else {
            widths[desc.propName] = {
               col: Math.max(current.col || 0, value.length)
            };
         }
      });
      return widths;
   }, {});

   // Build the padded values for the top and bottom, and each row.
   const topBottom = colDescriptors.map((desc) => padEnd('', colWidths[desc.propName].col, '─'));

   const rows = rowData.map((entry) => {
      return colDescriptors.map((desc) => {
         const value = entry[desc.propName].toString() + (desc.unit || '');
         const widthInfo = colWidths[desc.propName];

         if (desc.alignChar) {
            return padForAlign(value, widthInfo.col, ' ', desc.alignChar, widthInfo.left);
         } else {
            return padEnd(value, widthInfo.col, ' ');
         }
      });
   });

   // Wrap the values in the pretty unicode table edges.
   const table = rows.map((row) => '│ ' + row.join(' │ ') + ' │');
   table.unshift('┌─' + topBottom.join('─┬─') + '─┐');
   table.push('└─' + topBottom.join('─┴─') + '─┘');

   return table.join('\n');
}

// Return a string that contains the "value" string in a cell cellWidth chars wide, padded on the end by padChar
function padEnd(value, cellWidth, padChar = ' ') {
   const cellValue = [ value ];
   let ctr = value.length;

   while (ctr < cellWidth) {
      cellValue.push(padChar);
      ctr++;
   }

   return cellValue.join('');
}

// Pad a value so that the first occurrence of "alignChar" is at "alignCol" in a cell of cellWidth chars
function padForAlign(value, cellWidth, padChar, alignChar, alignCol) {
   const cellValue = [];
   const alignOffset = value.indexOf(alignChar);
   let ctr = alignOffset;

   // First, put any spaces before the value, so that its alignChar will be at alignCol
   while (ctr < alignCol) {
      cellValue.push(padChar);
      ctr++;
   }

   cellValue.push(value);
   ctr += value.length - alignOffset;

   // pad out the rest of the cell
   while (ctr < cellWidth) {
      cellValue.push(padChar);
      ctr++;
   }

   return cellValue.join('');
}

module.exports = formatTable;
