import crypto from 'crypto';

const decriptCesarsCipher = (text: string, rounds: number): string => {
  const textDecripted = text.split('').map(
    (letter: string): string => {
      const onlyLetters = new RegExp(/[A-Za-z]/gm);

      if (onlyLetters.test(letter)) {
        return String.fromCharCode(letter.charCodeAt(0) - rounds);
      }

      return letter;
    },
  ).join('');

  return textDecripted;
};

const generateSha1 = (text: string) : string => {
  const shasum = crypto.createHash('sha1');
  shasum.update(text);
  return shasum.digest('hex');
};

export default { decriptCesarsCipher, generateSha1 };
