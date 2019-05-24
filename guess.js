// INSTRUCTIONS: Build a command-line based zombie fighting game. 
// =========================================================================================================

// In this game, you and a zombie will each be given a certain amount of health. (Perhaps: You 70, Zombie 15).

// For each round, you will be asked to guess a random number between 1 and 5.
// If your guess matches the random number of the Zombie -- you inflict a random amount of damage between 1 and 5. 
// If you guess does not match the random number of the Zombie -- the Zombie inflicts a random amount of damage to you between 1 and 5.
// Each round the zombie is given a new random number and you must guess again. 

// The game ends when you or the zombie gets to 0 health. 

// Note: You should use the inquirer package to take in user commands.
// Major Warning: inquirer's prompt function is "asynchronous", which means that the majority of your game logic will need to be inside the .then() function for your prompt. 

// ===========================================================================================================
var inquirer = require("inquirer");
var Word = require("./word");
var newGame = true;
var noOfAttempts = 5;
var guessed_word;
var guessedWordArr = [];

var wordsColletion = ['Green Book', 'Moonlight', 'Spotlight', 'Birdman', 'Argo', 'The Artist', 'The Hurt Locker', 'Slumdog Millionaire', 'No Country for Old Men', 
                        'The Departed', 'Crash', 'Million Dollar Baby', 'Chicago', 'A Beautiful Mind', 'Gladiator', 'Shakespeare in Love', 'Titanic',
                        'The English Patient', 'Braveheart', 'Forrest Gump', 'my cousin vinny', 'Aristocats', 'Madagascar', 'Shrek' , 'Three idiots', 'Psycho',
                        'Vertigo', 'Rear Window', 'Spellbound', 'Rebecca', 'The Gold Rush', 'The Great Dictator', 'Modern Times'];
                    
getInquiry(newGame);

//get random word from the words 
function get_New_Word(wordsList)
{
    //check how many words in the list
    var i = wordsList.length;
    var random = generateRandomNumber(i);
    var randomWord = wordsList[random];
    //console.log(randomWord);
    return randomWord;
}

//generate random # for that list to pick a random word
function generateRandomNumber(num){
    var x;
    var arr = [];
    //create a random array with 50 nos
    for (var i = 0; i < 50; i++)
    {
        arr.push(Math.trunc(Math.random() * num) + 1);
    }
    //pick1 random number from the array
    var i = Math.trunc(Math.random() * 20 + 1);
    var x = arr[i];
    return x;
}

 //match the letters to given array
function printMatchedWord(guessArr)
 {
    var wordArr = guessed_word.toLowerCase().split('');
    var currWord = '';

    for(i=0; i < wordArr.length; i++)
    {
        var matched = false;

        if( wordArr[i] == " ")
        {
            currWord = currWord +  ' ';
        }
        else
        {
            // console.log(wordArr[i]);
            for (x=0; x < guessArr.length; x++)
            {
                if(wordArr[i] == guessArr[x])
                {
                    currWord = currWord +  guessArr[x]; 
                    matched = true;
                    break;
                }                
            }
            if(!matched)
            {
                currWord = currWord +  '_'
            }
        }
    }
    //print the words with guessed letters and blanks
    return currWord;
 }

function getInquiry(newGame)
{ 
    if(newGame)
    {
        newGame = false;
        //first get a random word from the list
        guessed_word = get_New_Word(wordsColletion);   
        // console.log(chosenWord);
        var currWord = new Word(guessed_word);
        // console.log(currWord);
        //print the dashes for each letter etc
        var letterArr = currWord.createLetterArr();
        noOfAttempts = letterArr.length * 2;
        currWord.printWord();
        

        inquirer
            .prompt([
            //guess a letter
            {
                type: "input",
                message: "guess a letter",
                name: "userInput"
            }
        ])
        .then(function(response){
            // if(response.userInput > 0 && response.userInput < 6){ check for the ascii
            //check woth resutls for matched words and left attempts
            getResults(response.userInput, guessed_word);            
        })
    }
    else
    {
        inquirer
        .prompt([
        //guess a letter
        {
            type: "input",
            message: "guess a letter",
            name: "userInput"
        }
        ])
        .then(function(response){
            // if(response.userInput > 0 && response.userInput < 6){ check for the ascii
            //check woth resutls for matched words and left attempts
            getResults(response.userInput, guessed_word);            
        })
    }
    
}

function getResults(userPick, guessed_word){    
    var arr = guessed_word.toLowerCase().split('');
    //console.log("userPick: " + userPick + " word arr: " + arr);
    newGame = false;
    var curGuess = '';
    //if any letter matched
    if (arr.includes(userPick)) 
    {
        //correct guess
        console.log("That was correct guess!");
        //covering for if user guessing same letter more than once otherwise adding the letter for correct guess array
        if (!guessedWordArr.includes(userPick))
        {
            guessedWordArr.push(userPick);
        }
        
        curGuess = printMatchedWord(guessedWordArr);
        var curGuessArr = curGuess.split('');
        //Check if the arrays match
        //console.log("guessed arr: " + guessedWordArr + " chosen arr: " + arr);
        if(curGuessArr.includes('_'))
        {
            console.log("\n Total attempts left: " + noOfAttempts);
            console.log(curGuess);
            getInquiry(newGame);
        } 
        else
        {
            //print what we have so far            
            console.log(curGuess);
            console.log("You won!");
        }               
    }
    else
    {
        //reduce attempt by 1
        noOfAttempts = noOfAttempts - 1;
        //Show left attempts
        if(noOfAttempts <= 0)
        {
            //game Over show score
            console.log("That was incorrect guess! You lost!");            
        }
        else
        {
            console.log("That was incorrect guess! try again!");
            console.log("\n Total attempts left: " + noOfAttempts);
            console.log(curGuess);
            //keep them guessing
            getInquiry(newGame);
        }
    }
}

// //tred the new function we learned in the class but could not successfully impliment
// function displayResults(isGuess, callback)
// {
//     if(isGuess)
//     {
//         getInquiry(newGame);
//     }
//     else
//     {

//     }
// }
