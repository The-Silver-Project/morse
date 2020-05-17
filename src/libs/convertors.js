import { charToMorse, morseToChar } from './morse-code-map';

// Alternative morse characters
const dash = /_/g;
const space = / *[\\/|] */g;

function textToMorse(text = '') {
  const chars = text.trim().toLowerCase().split('');

  chars.forEach((char, i) => {
    chars[i] = charToMorse[char] || '#';
  });

  return chars.join(' ').replace(/ \n /g, '\n');
}

function morseToText(morse = '') {
  if (!morse) return '';

  const chars = morse
    .replace(dash, '-')
    .replace(space, ' \\ ')
    .replace(/\n/g, ' \n ')
    .replace(/ +/g, ' ')
    .trim()
    .split(' ');

  chars.forEach((char, i) => {
    chars[i] = morseToChar[char] || '#';
  });

  return chars.join('');
}

export {
  textToMorse,
  morseToText,
};
