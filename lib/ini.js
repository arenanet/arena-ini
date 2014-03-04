/*jshint node:true */
"use strict";

var matchers = {
        section : /^\[([^\]]+)\]/,
        rule    : /^([^=]+)=(.*)/,
        values  : /([^,]+),?/g
    };

module.exports = function(config) {
    var result = {},
        section,
        rule;

    config = config.split(/\r?\n/g);
    
    config.forEach(function(line) {
        var first = line.charAt(0),
            tokens, token;

        line = line.trim();

        // Empty Line
        if(!line.length) {
            return;
        }

        // Comment line
        if(first === ";") {
            return;
        }

        if(first === "[") {
            tokens = line.match(matchers.section);

            section = [];
            result[tokens[1]] = section;

            return;
        }

        tokens = line.match(matchers.rule);

        rule = {
            name   : tokens[1].trim(),
            value  : tokens[2].trim(),
            values : []
        };

        while((token = matchers.values.exec(rule.value)) !== null) {
            rule.values.push(token[1].trim());
        }

        section.push(rule);
    });

    return result;
};
