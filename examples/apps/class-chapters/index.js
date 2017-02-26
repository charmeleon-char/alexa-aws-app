'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('class-chapters');
var ReadChapter = require('./read-chapter');

app.launch(function(req, res) {
  var prompt = 'For delay information, tell me an Airport code.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('chapter-read', {
  'slots': {
    'CHAPTERNUMBER': 'AMAZON.NUMBER'
  },
  'utterances': ['read {|me} chapter {-|CHAPTERNUMBER}']
},
  function(req, res) {
    //get the slot
    var chapterNumber = req.slot('CHAPTERNUMBER');
    var reprompt = 'Tell me the chapter you want me to read';
    if (_.isEmpty(chapterNumber)) {
      var prompt = 'I didn\'t hear a chapter number. Tell me the number';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var readChapter = new ReadChapter();

      var text = readChapter.getChapterText(chapterNumber);
      if (text){
        console.log(text);
        res.say(text).send();
      }
      else {
        var prompt = 'I didn\'t have data for chapter ' + chapterNumber;
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
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