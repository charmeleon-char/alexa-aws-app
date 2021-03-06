'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'https://www.opentdb.com/api.php';

var CATEGORIES = {
    film: 11,
    videogames: 15,
    science: 23
};

function Questions() { }

Questions.prototype.getByCategory = function(categoryName) {
    var category = CATEGORIES[categoryName.toLowerCase()];
    var url = ENDPOINT + '?amount=3&type=boolean&category=' + category;
    var options = {
        method: 'GET',
        uri: url,
        resolveWithFullResponse: true,
        json: true
    };
    return rp(options);
};

Questions.prototype.parseQuestion = function(question) {
    question = question.replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); })
    question = question.replace(/&quot;/g,'"');
    return question;
};

module.exports = Questions;