'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'https://liu-search-api-dev.appspot.com/api/v1/search/?content_type=programs&language=en&limit=1&offset=1&available_in_languages=English&keywords=';

function SearchDataHelper() {}

SearchDataHelper.prototype.requestProgram = function(keywords) {
    return this.getprogram(keywords).then(
        function(response) {
            console.log('success - received program info for ' + keywords);
            return response.body;
        }
    );
};

SearchDataHelper.prototype.getprogram = function(keywords) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + keywords,
        resolveWithFullResponse: true,
        json: true,
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODY1NzA1MzMsImNsaWVudF9pZCI6IjUwZDllNWE2LWUwZTEtNDdjOC1iMzBjLTJlOGM4ZDZiMmQwZSIsInVzZXIiOnsibGFzdF9uYW1lIjoiU2FsZ2FkbyIsInVuaXZlcnNpdHkiOiJVUEVTIiwiZmlyc3RfbmFtZSI6Ikd1aWxsZXJtbyIsInByb2ZpbGVfaWQiOiJlNzkzNDM5Yy0wMGM2LTRhYTItYmRhMy0yYzEzNzdhMTZkODIiLCJlbWFpbCI6Imd1aWxsZXJtb3NhbGdhZG8yMkBnbWFpbC5jb20ifX0.iQxz4OVOo7l1jBkqWu_HAZRqegvYX6ti7M-wZw754tw',
            Origin: 'liu-onecampus-qa.appspot.com'
        }
    };
    return rp(options);
};

module.exports = SearchDataHelper;
