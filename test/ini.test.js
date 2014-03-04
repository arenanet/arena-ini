/*jshint node:true */
"use strict";

var fs  = require("fs"),
    ini = require("./lib/ini");

describe("arena-ini", function() {
    describe("parser", function() {
        it("should parse simple configs", function() {
            var o = ini(fs.readFileSync("./test/specimens/simple.ini", "utf8"));
            
            console.log(o);
        });
    });
});
