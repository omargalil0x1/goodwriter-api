let spelling = require('spelling'), dictionary = require('spelling/dictionaries/en_US.js');

let dict = new spelling(dictionary);

let ignoreEmails = require('./ignore-emails.js') // for ignoring emails and removing it from text, to disable mistake detection on emails.

const spellchecker = require('spellchecker');

const _ = require('lodash')


function parse(TEXT) {

  //target text.
  let text = ignoreEmails.index(TEXT) // text to be tested.

  const wordsList = text.match(/\b[a-zA-Z]+\b/g) //getting the words from text based on the regex.

  if(wordsList != null || wordsList != undefined)  {

      // getting the mistakes for the words.
      let mistakes = []

      for(let i = 0; i < wordsList.length; i++) {

        if( spellchecker.isMisspelled(wordsList[i]) == true) {

          let WORD = dict.lookup(wordsList[i])

          let sugs = []

          let repeated = 0;

          try {
            for(let i = 0; i < WORD.suggestions.length; i++) {
              sugs.push(WORD.suggestions[i].word)
            }
          } catch {
            console.log('no suggestions found for word : ', wordsList[i])
          }

          try {
            for(let i = 0; i < wordsList.length; i++) {
              if(WORD.word == wordsList[i]) { repeated += 1 }
            }
          } catch {
            console.log('reps')
          }


          // push the object that contains the mistakes of the text (single mistake)
          mistakes.push({

            word: wordsList[i],
            recommendations: sugs.length == 0 ? 'no recommendations' : sugs,
            repeated,

          })


        }
      }

      //sending array of mistakes, uniqunesss by the word itself.
      return _.uniqBy(mistakes, 'word')

  } else {

    return []

  }


}

module.exports = { parse }



