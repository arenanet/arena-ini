arena-ini
=========

INI line-by-line parser for ArenaNet-styled INI files

## Usage ##

```javascript
var fs     = require("fs"),
    parser = require("arena-ini"),
    ini;

ini = parser(fs.readFileSync("./test.ini", "utf8"));

// If ./test.ini looks like this
/*
 * [section]
 *     key = value
 *     key = values, values, values
 * 
 * [section2]
 *     key = value value value
 */

// ini now contains an object like this
/*
 * {
 *     "section" : [
 *         {
 *             name   : "key",
 *             value  : "value"
 *             values : [
 *                 "value"
 *             ]
 *         },
 *         {
 *             name   : "key",
 *             value  : "values, values, values"
 *             values : [
 *                 "values",
 *                 "values",
 *                 "values"
 *             ]
 *         },
 *     ],
 *     
 *     "section2" : [
 *         {
 *             name   : "key",
 *             value  : "value value value"
 *             values : [
 *                 "value value value"
 *             ]
 *         }
 *     ]
 * }
 *
 */
```
