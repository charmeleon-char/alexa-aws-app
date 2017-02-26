'use strict';
var _ = require('lodash');
var rp = require('request-promise');

var chapters = {
    '1': 'Finance is the art and science of managing value, and all executives need a sound understanding of strategic financial issues, such as how to grow a business by improving profits and cash flow.To begin this module, you focus on how the role of finance creates value for a company. You will analyse key financial theories, such as the Capital Asset Pricing Model and Agency Theory, to assess how finance can support the strategic vision of a company. Topics in this module include making the right capital budgeting decisions and financing decisions. Finally, you focus on financial planning and financial modelling while focusing on disruption, efficiency or sustainability to create value for the business.By this end of this module, you should be able to analyse investment relationships with key stakeholders (and shareholders) at the corporate level, identify potential conflicts of interest, and apply techniques to support financial modelling and financial performance monitoring.',
    '2': 'Cohort ActivityDiscover something new to ignite your thinking about financing a business.DIRECTIONS:Go to the Resources tab and watch the media programs. Take notes as you watch.Consider how you might answer the following questions:With whom did you sympathise: the ambitious businessmen (also represented by Richard Branson) or the stingy-looking finance executive?Why?What would you write if you were to modify the script in the film clip? Add a few lines to defend the position of the executive representing the ‘financial perspective’.Search the Internet and your school library for information that will help you to answer these questions.Go to the Collaborate tab and create a new Discussion post. In your post, share your answers to the questions and links to any websites you found that helped you to answer the questions.Click on your peers’ Discussion posts and read through them. Select at least two peers and comment on their posts in a way that builds on their discovery thinking.RESOURCESCOLLA'
};

function ReadChapter() { }

ReadChapter.prototype.getChapterText = function(chapterNumber) {
  return chapters[chapterNumber];
};

module.exports = ReadChapter;