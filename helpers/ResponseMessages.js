import fs from 'fs';
import moment from 'moment';
import Messages from './MessageDicitionary';

const padLeft2 = (number) => number.toString().padStart(2, 0);

const getStatusCode = (messageCode) => messageCode.splice(0, 3);

const log = (messageCode) => {
  const now = moment();
  const path = `${__dirname}/../logs/${now.get('year')}/${padLeft2(now.get('month')) + 1}/${padLeft2(now.get('date'))}`;
  fs.mkdirSync(path, { recursive: true });
  fs.appendFileSync(
    `${path}/${padLeft2(now.get('hour'))}h00.txt`,
    `${now.format('HH:mm:ss')} - [${messageCode}]: ${Messages[messageCode]}\n\n`,
  );
};


export const defaultSuccess = (res, messageCode) => {
  log(messageCode);
  return res.status(getStatusCode(messageCode)).json({
    status: 'ok',
    messageCode,
    message: Messages[messageCode],
  });
};

export const defaultError = (res, messageCode) => {
  log(messageCode);
  return res.status(getStatusCode(messageCode)).json({
    status: 'error',
    messageCode,
    message: Messages[messageCode],
  });
};
