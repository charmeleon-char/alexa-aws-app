'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('ask_questions');

app.launch(function(req, res) {
    var prompt = 'Lets play a quiz yeahh';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('ask_questions', {
        'slots': {
            'CATEGORY': 'CATEGORIES'
        },
        'utterances': ['select category {-|CATEGORY}']
    },
    function(req, res) {
        //get the slot
    }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;