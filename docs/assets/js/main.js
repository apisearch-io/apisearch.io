$(document).ready(function() {
  buildMagicSearch();
  buildBurger();
  buildStackSlider();
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

document.addEventListener('scroll', function() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      document.getElementById('main-nav-section').classList.add('scrolled');
  } else {
    document.getElementById('main-nav-section').classList.remove('scrolled');
  }
});

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

function buildStackSlider() {

  $('.stack-slider').each(function() {
    const $slider = $(this);
    const lateral = $slider.attr('data-slider-lateral') === '1';
    positionStackSlider($slider.find('img'), 4, lateral);
    let initialPosition = 3;
    setInterval(function() {
      const $images = $slider.find('img');
      initialPosition = (initialPosition) % $images.length;
      positionStackSlider($images, initialPosition, lateral);
      initialPosition--;
    }, 5000);
  });
}

function positionStackSlider($slides, initialPosition, lateral)
{
  let i = 3;
  $slides.each(function() {
    const $this = $(this);
    const position = (i + initialPosition) % $slides.length
    $this.attr('data-position', position);
    if (position===0) {
      $this.css('top', "0px");
      $this.css('width', '100%');
      $this.css('left', '0%');
      $this.css('z-index', 0);
      $this.css('filter', 'unset');
      $this.css('display', 'unset');
      i++;
      return;
    }

    if (position===$slides.length-1) {
      $this.css('opacity', '0');
    } else {
      $this.css('opacity', '1');
    }

    const multiplier = position;
    const left = lateral ? (-5*multiplier) : (5*multiplier)/2;
    $this.css('top', "-" + 10*multiplier + "px");
    $this.css('width', 100-(5*multiplier) + '%');
    $this.css('left', left + '%');
    $this.css('z-index', -1 * position);
    $this.css('filter', 'contrast(0.5)');
    $this.css('display', 'unset');
    i++;
  })
}
