var Letters = require("./letter");

var Word = function(chosen){
    this.secret = chosen.toLowerCase();
    this.letters = this.secret.split('');
}

//write a function to print the blank spaces
Word.prototype.printWord = function(){
    var wordArr = this.letters;
    var currWord = '';

    for(i=0; i< wordArr.length; i++)
    {
        if( this.letters[i] != " ")
        {
            currWord = currWord +  '_';
        }
        else
        {
            currWord = currWord + ' ';
        }
    }
    //print the wors with blanks
    console.log(currWord)
}

//create array with unique letters
Word.prototype.createLetterArr = function(){
    var wordArr = this.letters;
    var arrLetters = [];
    for (i=0; i<wordArr.length; i++)
    {
        if (!arrLetters.includes(wordArr[i]) && wordArr[i] != "")
        {
            arrLetters.push(wordArr[i]);
        }
    }
    return arrLetters;
 }

module.exports = Word;

