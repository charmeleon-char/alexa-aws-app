'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('search_keyword');
var SearchDataHelper = require('./search_data_helper');

app.launch(function(req, res) {
    var prompt = 'Tell me a keyword for search information.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('search_keyword', {
        'slots': {
            'KEYWORD': 'AMAZON.LITERAL'
        },
        'utterances': ['{|search|look|seek} {|for} {-|KEYWORD}']
    },
    function(req, res) {
        //get the slot
        var keyword = req.slot('KEYWORD');
        var reprompt = 'Tell me a keyword for search information.';
        if (_.isEmpty(keyword)) {
            var prompt = 'Sorry, the keyword can not be empty.';
            res.say(prompt).reprompt(reprompt).shouldEndSession(false);
            return true;
        } else {
            var searchDataHelper = new SearchDataHelper();
            searchDataHelper.requestProgram(keyword).then(function(response) {
                if(response['results'].length > 0) {
                    var resp = 'Results: ';
                    response['results'].forEach(function (element, index, array){
                        resp = resp + element['name'] + ', ';
                    });
                    res.say(resp).send();
                } else {
                    var prompt = 'Sorry, there are no results with that keyword!.';
                    res.say(resp).send();
                }
            }).catch(function(err) {
                var prompt = err;
                res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
            });
            return false;
        }
    }
);

var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};
module.exports = app;
