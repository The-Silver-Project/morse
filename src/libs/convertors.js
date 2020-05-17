import { charToMorse, morseToChar } from './morse-code-map';

function textToMorse(text = '') {
  const chars = text.trim().toLowerCase().split('');
  chars.forEach((char, i) => {
    chars[i] = charToMorse[char] || '#';
  });

  return chars.join(' ');
}

function morseToText(morse = '') {
  if (!morse) return '';

  const chars = morse.trim().split(' ');
  chars.forEach((char, i) => {
    chars[i] = morseToChar[char] || '#';
  });

  return chars.join('');
}

export {
  textToMorse,
  morseToText,
};
