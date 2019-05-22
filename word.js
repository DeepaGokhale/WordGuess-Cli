var Word = function(chosen){
    this.secret = chosen;
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
    console.log(currWord)
}


module.exports = Word;

