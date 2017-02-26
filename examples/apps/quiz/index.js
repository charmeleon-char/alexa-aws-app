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
    var correct = 0;
    res.session('numberOfQuestion', numberOfQuestion);
    res.session('correct', correct);
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
            res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
            return true;
        } else {
            var questions = new Questions();
            questions.getByCategory(category).then(function(response) {
                var quiz = response.body.results;
                if (_.isEmpty(quiz)) {
                    var prompt = 'I didn\'t find any questiosn with that category. Tell me another category please Bro';
                    var reprompt = 'Tell me another category please Bro';
                    res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
                } else {
                    res.session('questions', quiz);
                    var prompt = 'Say start game to begin.';
                    res.say(prompt).reprompt(prompt).shouldEndSession(false).send();
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
        res.session('numberOfQuestion', 0);
        var questionsHelper = new Questions();
        var questions = res.session('questions');
        var numberOfQuestion = res.session('numberOfQuestion');
        var currentQuestion = questions[numberOfQuestion];
        if (currentQuestion){
            res.session('currentQuestion', currentQuestion);
            currentQuestion = questionsHelper.parseQuestion(currentQuestion.question);
            res.say(currentQuestion).send();
        }
        else {
            var prompt = 'No more questions';
            var reprompt = 'Tell me another category please Bro';
            res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
        }
    }
);

app.intent('AMAZON.NextIntent', {
        'slots': {},
        'utterances': ['next']
    },
    function(req, res) {
        var numberOfQuestion = res.session('numberOfQuestion') + 1;
        res.session('numberOfQuestion', numberOfQuestion);
        var questionsHelper = new Questions();
        var questions = res.session('questions');
        var currentQuestion = questions[numberOfQuestion];
        if (currentQuestion){
            res.session('currentQuestion', currentQuestion);
            currentQuestion = questionsHelper.parseQuestion(currentQuestion.question);
            res.say(currentQuestion).send();
        }
        else {
            var correct = res.session('correct');
            var msg = 'You guessed ' + correct + ' questions correctly';
            res.say(msg).send();
        }
    }
);

app.intent('give_answer', {
        'slots': {
            'ANSWER': 'BOOLEAN',
        },
        'utterances': ['my answer is {-|ANSWER}']
    },
    function(req, res) {
        var answer = req.slot('ANSWER');
        if (_.isEmpty(answer)) {
            var prompt = 'Please say true or false';
            res.say(prompt).reprompt(prompt).shouldEndSession(false).send();
            return true;
        } else {
            var currentQuestion = res.session('currentQuestion');
            if (currentQuestion.correct_answer.toLowerCase() === answer){
                var correct = res.session('correct') + 1;
                res.session('correct', correct);
                res.say('Correct!, say next to continue').send();
            }
            else {
                res.say('Incorrect!, say next to continue').send();
            }
        }
    }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;