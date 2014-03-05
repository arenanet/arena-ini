/*jshint node:true */
"use strict";

var matchers = {
        section : /^\[([^\]]+)\]/,
        rule    : /^([^=]+)=(.*)/,
        values  : /([^,]+),?/g,
        comment : /;.+/
    };

module.exports = function(config) {
    var result = {},
        section,
        rule;

    config = config.split(/\r?\n/g);
    
    config.forEach(function(input) {
        var line  = input.trim(),
            first = line.charAt(0),
            tokens, token;

        // Empty Line
        if(!line.length) {
            return;
        }

        // Comment line
        if(first === ";") {
            return;
        }

        // Section
        if(first === "[") {
            tokens = line.match(matchers.section);

            section = [];
            result[tokens[1]] = section;

            return;
        }

        // Rule
        tokens = line.match(matchers.rule);

        rule = {
            name   : tokens[1].trim(),
            value  : tokens[2].replace(matchers.comment, "").trim(),
            values : []
        };

        while((token = matchers.values.exec(rule.value)) !== null) {
            rule.values.push(token[1].trim());
        }

        section.push(rule);
    });

    return result;
};
