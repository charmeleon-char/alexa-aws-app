'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('quiz');
var Questions = require('./questions');
// let quiz = [];

app.launch(function(req, res) {
    var prompt = 'Lets play a quiz yeahh';
    var numberOfQuestion = 0;
    res.session('numberOfQuestion', numberOfQuestion);
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('quiz', {
        'slots': {
            'CATEGORY': 'CATEGORIES'
        },
        'utterances': ['i will play with {-|CATEGORY}']
    },
    function(req, res) {
        var category = req.slot('CATEGORY');
        if (_.isEmpty(category)) {
            var prompt = 'I didn\'t hear a category name. Tell me the category please Bro';
            var reprompt = 'Tell me another category please Bro';
            res.say(prompt).reprompt(reprompt).shouldEndSession(false);
            return true;
        } else {
            var questions = new Questions();
            questions.getByCategory(category).then(function(response) {
                var quiz = response.body.results;
                if (_.isEmpty(quiz)) {
                    var prompt = 'I didn\'t find any questiosn with that category. Tell me another category please Bro';
                    var reprompt = 'Tell me another category please Bro';
                    res.say(prompt).reprompt(reprompt).shouldEndSession(false);
                    return true;
                } else {
                    res.session('questions', quiz);
                    var prompt = 'Say start game to begin.';
                    res.say(quiz[0].type).reprompt(prompt).shouldEndSession(false);
                }
            });
            return false;
        }
    }
);

app.intent('game', {
        'slots': {},
        'utterances': ['start game']
    },
    function(req, res) {
    }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;