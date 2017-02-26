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
            'KEYWORD': 'KEYWORD'
        },
        'utterances': ['{|search|look|seek} {|for} {-|KEYWORD}']
    },
    function(req, res) {
        //get the slot
        var keyword = req.slot('KEYWORD');
        var reprompt = 'Tell me a keyword for search information.';
        if (_.isEmpty(keyword)) {
            var prompt = 'Sorry, there are no results with that keyword!.';
            res.say(prompt).reprompt(reprompt).shouldEndSession(false);
            return true;
        } else {
            var searchDataHelper = new SearchDataHelper();

            searchDataHelper.requestProgram(keyword).then(function(programRecomment) {
                var response = 'Program name: ' + programRecomment['results'][0]['name'] + ' Description: ' + programRecomment['results'][0]['description'];
                console.log(response);
                res.say(response).send();
            }).catch(function(err) {
                var prompt = err;
                res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
            });
            return false;
        }
    }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};
module.exports = app;
