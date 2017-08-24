$(document).ready(function() {
	var timer = 16;
    var currentIndex = 0;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var userSelection;
    var intervalId;

    var questions = [
      {
        question: "How many biomes do the Santa Catalina Mountains contain?",
        options: ["2", "4", "8"],
        answer: "8",
        explanation: "! The mountains contain the same variety of climate, vegetation, and fauna one would encounter while traveling from Mexico to Canada, all within an hours drive."
      },
      {
        question: "For every 1,000 feet of elevation gain, how many inches does the annual precipitation increase?",
        options: ["1 inch", "3 inches", "4.5 inches"],
        answer: "4.5 inches",
        explanation: "."
      },
      {
        question: "For every 1,000 feet of elevation gain, how many degrees does the temperature drop?",
        options: ['1 degree', '4 degrees', '7 degrees'],
        answer: "4 degrees",
        explanation: "! At 9,157 feet, the summit of Mount Lemmon is typically 20 to 30 degrees cooler than Tucson."
      },
      {
        question: "Surprisingly, Tucson averages 0.6 inches of snowfall per year, how many inches does the ski area on Mount Lemmon receive",
        options: ['100 inches', '140 inches', '180 inches'],
        answer: "180 inches",
        explanation: "! Depending on the year, the ski area is open from December to February."
      },
      {
        question: "What about Arizona's Sky Islands makes them particularly prone to containing so much biodiversity?",
        options: ["Their elevation", 'Their latitude', 'Their distance apart from each other'],
        answer: "Their distance apart from each other",
        explanation: "! The higher biological communities of the Sky Islands have been isolated from one another for a very long time. Because of this, populations isolated from each other on scattered mountaintops quickly can develop into separate populations and ultimately diverge into different species."
      }
    ];

    $("#start").on("click", function() {
      $('.initialize').addClass('hidden');
      $('.timeRemaining').removeClass('hidden');
      $('.question').removeClass('hidden');
      generateQuestions();
      startTimer();
    });

    function startTimer() {
      intervalId = setInterval(countDown, 1000);
    }

    //timer count down
    //function is called 1/second and until time = 0
    function countDown() {
      timer--;
      $('#time').html(timer);
      //if time = 0, show the correct answer
      //also check if the next question is the last question
      if (timer === 0) {
        clearInterval(intervalId);
        $('#message').html('Time is up!');
        $('#correctAnswerIs').html('The answer is ' + questions[currentIndex].answer);
        $('.question').addClass('hidden');
        $('.answer').removeClass('hidden');
        unanswered++;
        currentIndex++;
        if (currentIndex < questions.length) {
          setTimeout(nextQuestion, 1000 * 6);
        }
        else {
          setTimeout(results, 1000 * 6);
        }
      }
    }

    function generateQuestions() {
      $('#prompt').html(questions[currentIndex].question);
      $('#option1').html(questions[currentIndex].options[0]);
      $('#option2').html(questions[currentIndex].options[1]);
      $('#option3').html(questions[currentIndex].options[2]);
    }

    //answer user selects
    //based on html objects being of option class
    $('.option').on('click', function(event) {
      event.preventDefault();
      //stop timer
      clearInterval(intervalId);
      //hide question text
      $('.question').addClass('hidden');
      //show answer txt
      $('.answer').removeClass('hidden');

      //retrieves the text from answer chosen
      userSelection = $(this).text();

      //if correct answer is chosen, reaffirm the choice and increment correct counter variable
      if (userSelection === questions[currentIndex].answer) {
        $('#message').html('Correct!');
        $('#correctAnswerIs').html('The answer is ' + questions[currentIndex].answer + questions[currentIndex].explanation);
        correct++;
      }
      //the wrong answer is chosen, timed out answers are handled in a different fucntion
      else {
        $('#message').html('Wrong!');
        $('#correctAnswerIs').html('The answer is ' + questions[currentIndex].answer + questions[currentIndex].explanation);
        incorrect++;
      }
      //increment the current index
      currentIndex++;
      //check if we've hit the last question
      if (currentIndex < questions.length) {
        setTimeout(nextQuestion, 1000 * 3);
      }
      else {
        setTimeout(results, 1000 * 3);
      }
    });

    //resets timer, hides the answer class, display the question class, generates the text for the current question, starts the timer
    function nextQuestion() {
      timer = 16;
      $('#counter').html('15');
      $('.answer').addClass('hidden');
      $('.question').removeClass('hidden');
      generateQuestions();
      startTimer();
    }

    //display the results of the 
    function results() {
      $('#correct').html(correct);
      $('#incorrect').html(incorrect);
      $('#unanswered').html(unanswered);
      $('.answer').addClass('hidden');
      $('.timeRemaining').addClass('hidden');
      $('.results').removeClass('hidden');
    }

    //restart game
    $('#restart').on('click', function () {
      currentIndex = 0;
      timer = 16;
      correct = 0;
      incorrect = 0;
      unanswered = 0;
      $('.results').addClass('hidden');
      $('.timeRemaining').removeClass('hidden');
      $('.question').removeClass('hidden');
      generateQuestions();
      startTimer();
    });
});