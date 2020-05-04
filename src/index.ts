// eslint-disable-next-line no-unused-vars
import codenationApi, { ObjectCodenation } from './codenationApi';
import criptography from './criptography';

(async (): Promise<void> => {
  const dataEncrypted: ObjectCodenation = await codenationApi.getData();
  const textDecrypted = criptography.decriptCesarsCipher(
    dataEncrypted.cifrado, dataEncrypted.numero_casas,
  );
  const sha1Diggest = criptography.generateSha1(textDecrypted);

  const dataBody: ObjectCodenation = {
    ...dataEncrypted,
    decifrado: textDecrypted,
    resumo_criptografico: sha1Diggest,
  };

  const status = await codenationApi.postData(dataBody);

  if (status !== 200) {
    console.error('Error on post api!');
    process.exit(1);
  }

  console.log('Posted on api!');
  process.exit(0);
})();
