$(document).ready(function() {
  buildMagicSearch();
  buildBurger();
});

function buildMagicSearch()
{
  const words = [
    'Marvel',
    'Iron-man',
    'Bruce Wayne',
    'Scooby-Doo',
    'Spider-man',
  ];

  const $demo = $('#input-search input');
  showNextFrame(
    $demo,
    words,
    0,
    0,
    1
  );

  $demo.on('click', function() {
    const $this = $(this);
    $this.attr('data-run', null);
    $this.attr('placeholder', '');
  })
}

/**
 *
 * @param $input
 * @param words
 * @param currentWord
 * @param currentLetter
 * @param currentDirection 0 if back, 1 if forward
 */
function showNextFrame(
  $input,
  words,
  currentWord,
  currentLetter,
  currentDirection
) {
  if (!$input.attr('data-run')) {
    return;
  }

  const currentWordText = words[currentWord];
  $input.attr('placeholder', currentWordText.substring(0, currentLetter));
  let nextWord = currentWord;
  let nextDirection = currentDirection;
  let nextLetter;
  let nextTime = 150;

  if (
    currentDirection === 1 &&
    currentLetter === currentWordText.length
  ) {
    nextDirection = 0;
    nextLetter = currentLetter--;
  }

  else if (
    currentDirection === 0 &&
    currentLetter === 0
  ) {
    nextWord = (currentWord+1) % words.length;
    nextDirection = 1;
    nextLetter = 1;
    nextTime = 2000;
  }

  else {
    nextLetter = currentDirection === 1 ? currentLetter+1 : currentLetter-1;
  }

  setTimeout(function() {
    showNextFrame(
      $input,
      words,
      nextWord,
      nextLetter,
      nextDirection
    );
  }, nextTime);
}

function buildBurger() {
  // open
  const burger = document.querySelectorAll('.navbar-burger');
  const menu = document.querySelectorAll('.navbar-menu');

  if (burger.length && menu.length) {
    for (var i = 0; i < burger.length; i++) {
      burger[i].addEventListener('click', function() {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle('hidden');
        }
      });
    }
  }

  // close
  const close = document.querySelectorAll('.navbar-close');
  const backdrop = document.querySelectorAll('.navbar-backdrop');

  if (close.length) {
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener('click', function() {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle('hidden');
        }
      });
    }
  }

  if (backdrop.length) {
    for (var i = 0; i < backdrop.length; i++) {
      backdrop[i].addEventListener('click', function() {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle('hidden');
        }
      });
    }
  }
}
