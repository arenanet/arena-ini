/*jshint node:true */
"use strict";

var fs     = require("fs"),
    assert = require("assert"),

    ini    = require("../lib/ini");

describe("arena-ini", function() {
    describe("parser", function() {
        it("should parse simple configs", function() {
            var o = ini(fs.readFileSync("./test/specimens/simple.ini", "utf8"));
            
            //console.log(JSON.stringify(o, null, 4));

            assert(o["Fooga.Booga"]);
            assert(o.woo);

            assert.deepEqual(
                o["Fooga.Booga"][0],
                {
                    name   : "Nooga",
                    value  : "Looga, Wooga, Googa",
                    values :  [
                        "Looga",
                        "Wooga",
                        "Googa"
                    ]
                }
            );
        });
    });
});
