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
var gameOver = false;
var noOfAttempts = 10;
var guessed_word;

var wordsColletion = ['Green Book', 'Moonlight', 'Spotlight', 'Birdman', 'Argo', 'The Artist', 'The Hurt Locker', 'Slumdog Millionaire', 'No Country for Old Men', 
            'The Departed', 'Crash', 'Million Dollar Baby', 'Chicago', 'A Beautiful Mind', 'Gladiator', 'Shakespeare in Love', 'Titanic',
            'The English Patient', 'Braveheart', 'Forrest Gump'];
                    
getInquiry(gameOver);

function getInquiry(gameOver)
{ 
    //first get a random word from the list
    var chosenWord = get_New_Word(wordsColletion);   
    // console.log(chosenWord);
    var currWord = new Word(chosenWord);
    // console.log(currWord);
    currWord.printWord();

    if(!gameOver)
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
            getResults(response.userInput);            
        })
    }
}

//get random word from the words 
function get_New_Word(wordsList)
{
    //check how many words in the list
    var i = wordsList.length;
    var random = generateRandomNumber(i);
    var randomWord = wordsList[random];
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

function getResults(userPick, guessed_word){

    //if any letter matched
    if ()
    {
        //correct guess

        getInquiry(gameOver);
    }
    else
    {
        //reduce attempt by 1
        
        //Show left attempts
        if(leftAttempts <= 0)
        {
            //game Over show score

        }
        else
        {
            //keep them guessing
            getInquiry(gameOver);
        }
    }
}

function doFinalCalc(score){
    //final scores and are going to continnue?
    userScore = userScore + score;
    zScore = zScore - score;
    if(userScore <= 0 || zScore <= 0)
    {
        //game Over show score
        console.log("Game is over!");
        console.log("Your score: " + userScore);
        console.log("Zombie Score: " + zScore);
    }
    else
    {
        gameOver = false;
        console.log("Your score: " + userScore);
        console.log("Zombie Score: " + zScore);
        getInquiry(gameOver);
    }
}
