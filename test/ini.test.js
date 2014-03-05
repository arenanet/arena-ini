/*jshint node:true */
"use strict";

var fs     = require("fs"),
    assert = require("assert"),

    ini    = require("../lib/ini");

describe("arena-ini", function() {
    describe("parser", function() {
        it("should parse simple configs", function() {
            var o = ini(fs.readFileSync("./test/specimens/simple.ini", "utf8"));
            
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

            assert.deepEqual(
                o["Fooga.Booga"][1],
                {
                    name   : "Rooga",
                    value  : "Tooga",
                    values : [
                        "Tooga"
                    ]
                }
            );
        });

        it("should ignore comments", function() {
            var o = ini(fs.readFileSync("./test/specimens/comments.ini", "utf8"));
            
            assert(o["Fooga.Booga"]);
            assert(o["Yooga"]);

            assert.deepEqual(
                o["Fooga.Booga"][1],
                {
                    name   : "Rooga",
                    value  : "Tooga",
                    values : [
                        "Tooga"
                    ]
                }
            );

            assert.deepEqual(
                o["Yooga"][0],
                {
                    name   : "Fooga",
                    value  : "Nooga",
                    values : [
                        "Nooga"
                    ]
                }
            );
        });
    });
});
