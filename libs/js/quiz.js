let currentCorrectScore;
let currentFailScore;
let currentPercentage;

$(document).on('click', '#quiz-restart', function () {
  console.log('restart');
  updateQuestion(0, 0, 0);
  currentCorrectScore = 0;
  currentFailScore = 0;
  currentPercentage = 0;
});

const updateQuestion = (currentCorrectScore, currentFailScore, currentPercentage) => {
  $.ajax({
    type: 'POST',
    url: 'libs/php/quizGenerator.php',
    dataType: 'text',
    data: {
      currentCorrectScore: currentCorrectScore,
      currentFailScore: currentFailScore,
      currentPercentage: currentPercentage
    },
    success: function (response) {
      $('#quiz-body').replaceWith(`<div class="modal-body" id="quiz-body">${response}</div>`);
    },

    error: function (errorThrown) {
      console.log(errorThrown);
    }
  });
};

$(document).on('click', '#quiz-1, #quiz-2, #quiz-3, #quiz-4', function (event) {
  console.log(event.target.value);
  currentCorrectScore = parseInt(
    $('#quiz-success')
      .text()
      .replace(/[^\d.-]/g, '')
  );
  currentFailScore = parseInt(
    $('#quiz-fail')
      .text()
      .replace(/[^\d.-]/g, '')
  );

  let questionsAttempted = currentFailScore + currentCorrectScore;
  console.log('qa ' + questionsAttempted);
  console.log('cor ' + currentCorrectScore);
  console.log('per ' + Math.round((currentCorrectScore / questionsAttempted) * 100));

  if (event.target.value === 'true') {
    console.log(currentCorrectScore);
    $(`#${event.target.id}`).css('background-color', '#5cb85c');

    currentCorrectScore++;
    questionsAttempted++;
    $('#quiz-success').text(`Correct: ${currentCorrectScore}`);
  } else {
    console.log(currentFailScore);
    $(`#${event.target.id}`).css('background-color', '#f0ad4e');

    currentFailScore++;
    questionsAttempted++;
    $('#quiz-fail').text(`Incorrect: ${currentFailScore}`);
  }
  currentPercentage = Math.round((currentCorrectScore / questionsAttempted) * 100);
  $('#quiz-percentage').text(`Success: ${currentPercentage}%`);

  updateQuestion(currentCorrectScore, currentFailScore, currentPercentage);
});
