'use strict';
var http = require('http');
var _ = require('lodash');
var rp = require('request-promise');


var ENDPOINT = 'http://liu-search-api-dev.appspot.com/api/v1/search?language=en&keywords=';

function FINDHelper() { }

FINDHelper.prototype.requestListing = function(content, terms) {
    return this.getListing(content, terms).then(
        function(response) {
            console.log('success - received listing for ' + terms + ' ' + content);
            return response.body;
        }
    );
};

FINDHelper.prototype.getListing = function(content, terms) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + terms,
        resolveWithFullResponse: true,
        json: true,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODY1NzA1MzMsImNsaWVudF9pZCI6IjUwZDllNWE2LWUwZTEtNDdjOC1iMzBjLTJlOGM4ZDZiMmQwZSJ9.CI918q5PUAVTIKdzwP1xNqEqIgNTAdpG9beMYlmccyE',
            'Origin': 'localhost:8080'
        }
    };

    return rp(options);
};

FINDHelper.prototype.formatResponse = function(response, content, terms) {
    var found = 'I found ' + response.results.length + ' ' + content + '. ';

    if (response.results.length >= 1) {
        var item = response.results[0];

        var template = found + 'First result is ' + item.name + ', ' + item.description;

        return template;
    } else {
        //    no delay
        return 'I could not find any items matching your criteria.';
    }
};

module.exports = FINDHelper;
