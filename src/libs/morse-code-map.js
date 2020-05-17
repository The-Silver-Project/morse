const charToMorse = {
  a: '.-',
  b: '-...',
  c: '-.-.',
  d: '-..',
  e: '.',
  f: '..-.',
  g: '--.',
  h: '....',
  i: '..',
  j: '.---',
  k: '-.-',
  l: '.-..',
  m: '--',
  n: '-.',
  o: '---',
  p: '.--.',
  q: '--.-',
  r: '.-.',
  s: '...',
  t: '-',
  u: '..-',
  v: '...-',
  w: '.--',
  x: '-..-',
  y: '-.--',
  z: '--..',

  á: '.--.-',
  ä: '.-.-',
  é: '..-..',
  ñ: '--.--',
  ö: '---.',
  ü: '..--',

  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----',

  '\n': '\n',

  ' ': '\\',
  ',': '--..--',
  '.': '.-.-.-',
  '?': '..--..',
  ';': '-.-.-',
  ':': '---...',
  '/': '-..-.',
  '-': '-....-',
  '\'': '.----.',
  _: '..--.-',
  '@': '.--.-.',
  '!': '-.-.--',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  '=': '-...-',
  '+': '.-.-.',
  '"': '.-..-.',
  $: '...-..-',
};

const morseToChar = {};

Object.keys(charToMorse).forEach((char) => {
  morseToChar[charToMorse[char]] = char;
});

export {
  charToMorse,
  morseToChar,
};
