'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('airportinfo');
var FAADataHelper = require('./search_data_helper');

app.launch(function(req, res) {
    var prompt = 'For delay information, tell me an Airport code.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('searchkeyword', {
        'slots': {
            'KEYWORD': 'KEYWORD'
        },
        'utterances': ['{|search|look|seek} {|for} {-|KEYWORD}']
    },
    function(req, res) {
        //get the slot
        var keyword = req.slot('searchkeyword');
        var reprompt = 'Tell me a keyword for search information.';
        if (_.isEmpty(keyword)) {
            var prompt = 'Sorry, there are no results with that keyword!.';
            res.say(prompt).reprompt(reprompt).shouldEndSession(false);
            return true;
        } else {
            var seachDataHelper = new seachDataHelper();

            seachDataHelper.requestProgram(keyword).then(function(programRecomment) {
                console.log(programRecomment);
                var response = programRecomment['name'] + programRecomment['description'];
                res.say(response).send();
            }).catch(function(err) {
                console.log(err.statusCode);
                var prompt = 'Sorry, there are no results with that keyword! ' + keyword;
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
