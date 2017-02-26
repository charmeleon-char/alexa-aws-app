'use strict';
// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'oespirilla';

// Instantiates a client
const translateClient = Translate({
  projectId: projectId,
  keyFilename: './keyfile.json'
});

function TranslateHelper() {}

TranslateHelper.prototype.translate = function(text) {

    var options = {
      from: 'en',
      to: 'es'
    };
    return translateClient.translate(text, options).then(
        function(response) {
            //console.log(response);
            return response;
        }
    );
};

module.exports = TranslateHelper;
