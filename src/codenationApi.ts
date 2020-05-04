import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import request from 'request';
import { promisify } from 'util';

dotenv.config();

export interface ObjectCodenation {
  'numero_casas': number,
  'token': string,
  'cifrado': string,
  'decifrado': string,
  'resumo_criptografico': string
}

const requestPromisified = promisify(request);

const getData = async (): Promise<ObjectCodenation> => {
  const { TOKEN } = process.env;
  const options = {
    method: 'GET',
    uri: `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${TOKEN}`,
  };

  const { body } = await requestPromisified(options);
  const bodyParsed = JSON.parse(body);

  return bodyParsed;
};

const postData = async (data: ObjectCodenation) : Promise<number> => {
  const answerPath = path.resolve(__dirname, 'answer.json');
  fs.writeFileSync(answerPath, JSON.stringify(data));
  const { TOKEN } = process.env;

  const options = {
    method: 'POST',
    uri: `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${TOKEN}`,
    port: 443,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    formData: {
      answer: fs.createReadStream(answerPath),
    },
  };
  const { statusCode } = await requestPromisified(options);

  return statusCode;
};

export default { getData, postData };
