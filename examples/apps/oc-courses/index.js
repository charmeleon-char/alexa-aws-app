var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var _ = require('lodash');
var app = new alexa.app('oc-courses');
var FINDHelper = require('./find_helper');

app.launch(function(req, res) {
  res.say("Welcome to one campus courses catalog, what are you looking for?");
});

app.intent('coursescatalog', {
  "slots": { "CONTENT": "LITERAL", "TERMS": "LITERAL" },
  "utterances": ["I'm looking for a|find me a} {course|program|CONTENT} about {TERMS}"]
}, function(req, res) {
  res.say('You are looking for a ' + req.slot('CONTENT') + ' about ' + req.slot('TERMS') + '. ');
  //get the slot
  var content = req.slot('CONTENT');
  var terms = req.slot('TERMS');
  var reprompt = 'Tell me what kind of content you are looking for.';
  if (_.isEmpty(content)) {
      var prompt = 'I didn\'t hear a content type. Tell me a content type.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
  } else {
      var findHelper = new FINDHelper();
      findHelper.requestListing(content, terms).then(function(response) {
          console.log(response);
          res.say(findHelper.formatResponse(response, content, terms)).send();
      }).catch(function(err) {
          console.log(err.statusCode);
          var prompt = 'I didn\'t have data for ' + content +  ' ' + terms;
          res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });
      return false;
  }
});

app.intent('AgeIntent', {
  "slots": { "AGE": "NUMBER" },
  "utterances": ["My age is {1-100|AGE}"]
}, function(req, res) {
  res.say('Your age is ' + req.slot('AGE'));
});

module.exports = app;
