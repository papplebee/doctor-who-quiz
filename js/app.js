/*====================================================
	Title: App JavaScript & JQuery Code;
	Project: Doctor Who Quiz App, Ver. 1.0;
	Author: Peter Applebee;
	Date Started: 24/08/2014;
====================================================*/


//Questions for Quiz ==================================================================
function Question(question, answer1, answer2, answer3, answer4) {
	this.question = question;
	this.answer1 = answer1;
	this.answer2 = answer2;
	this.answer3 = answer3;
	this.answer4 = answer4;
};

var allQuestions = new Array();

allQuestions[0] = new Question(
	"What is the name of the main protaganist of Doctor Who?", 
	"Who Man", 
	"Doctor Who", 
	"The Time Man", 
	"The Doctor"
	);
allQuestions[0].correctAnswer = allQuestions[0].answer4;

allQuestions[1] = new Question(
	"The Doctor travels in the TARDIS, but what does the acronym 'TARDIS' stand for?",
	"Travel Articulating Relational Device Inside Space",
	"TARgeted DISplacement machine",
	"Time And Relative Dimension In Space",
	"Time-travel And Reverse Dimension Instrument in Space"
	);
allQuestions[1].correctAnswer = allQuestions[1].answer3;

allQuestions[2] = new Question(
	"From which planet does the Doctor come?",
	"Pluto",
	"Alpha Galaxi",
	"Timeworld",
	"Gallifrey"
	);
allQuestions[2].correctAnswer = allQuestions[2].answer4;

allQuestions[3] = new Question(
	"What race of humanoid alien is the doctor?",
	"Space Lord",
	"Time Lord",
	"Time Master",
	"Space Master"
	);
allQuestions[3].correctAnswer = allQuestions[3].answer2;

allQuestions[4] = new Question(
	"How many times has the Doctor regenerated, as of 2014, including the time his appearance didn't change and the War Doctor?",
	"7",
	"5",
	"16",
	"13");
allQuestions[4].correctAnswer = allQuestions[4].answer4;
//End of Questions for Quiz =======================================================


$(window).load(function () {
	newGame();
})

$(document).ready(function() {

	//Set question number to choose from array
	var questionArrayNum = 0;

	//Start new Game - **function not complete yet**
	newGame = function() {
		insertQuestion(allQuestions[questionArrayNum]);
		coverUpRemove();
		setCurrentQuestion();
	};

	//Select current question number in header
	setCurrentQuestion = function() {
		$('.current').removeClass('current');
		var currentQuestionNum	= questionArrayNum + 1;
		var currentListItemId = "#num"+currentQuestionNum;
		$(currentListItemId).addClass('current');
	}

	//Insert question from array into DOM
	insertQuestion = function(allQuestionsNum) {
		$('.question').text(allQuestionsNum.question);
		$('.answer1').text(allQuestionsNum.answer1);
		$('.answer2').text(allQuestionsNum.answer2);
		$('.answer3').text(allQuestionsNum.answer3);
		$('.answer4').text(allQuestionsNum.answer4);
		correctAnswer = allQuestionsNum.correctAnswer;
	};

	//Remove invisible cover from over answers
	coverUpRemove = function() {
		$('#cover-up').css({'display':'none'});
	};

	//Select an answer
	$('#quiz-app').on('click', '.answers-ul li', function(event) {
		event.preventDefault();
		$('.answers-ul li').removeClass('answer');
		$(this).addClass('answer');
	});

	//Submit answer when pressing 'submit' button and give (correct/incorrect) feedback
	$('body').on('click', '.submit', function(event) {
		var answerText = $('.answer').text();
		//Check if user has given correct answer & provide appropriate feedback
		if (answerText === correctAnswer) {
			$(this).closest('#quiz-app').find('.answer').addClass('correct');
			$(this).closest('body').find('.current').addClass('num-correct');
		}
		else {
			$(this).closest('#quiz-app').find('.answer').addClass('incorrect');
			$(this).closest('body').find('.current').addClass('num-incorrect');
		};

		$(this).closest('#quiz-app').find('.answer').removeClass('answer');
		//Display cover up div to stop user selecting more answers
		$(this).closest('#quiz-app').find('#cover-up').css({'display':'block'});
		//hide 'submit' button & show (fade-in) 'next question' button
		$(this).hide();
		$(this).closest('.button-div').find('.next').fadeIn(800);
	});

	//Move on to next question, after submitting answer
	$('body').on('click', '.next', function () {
		$(this).closest('#quiz-app').find('.correct').removeClass('correct');
		$(this).closest('#quiz-app').find('.incorrect').removeClass('incorrect');
		questionArrayNum += 1;
		insertQuestion(allQuestions[questionArrayNum]);
		coverUpRemove();
		setCurrentQuestion();
		$(this).hide();
		$(this).closest('.button-div').find('.submit').fadeIn(800);
	});



})