import fs from 'fs';
import moment from 'moment';
import Messages from './MessageDicitionary';

const padLeft2 = (number) => number.toString().padStart(2, 0);

const getStatusCode = (messageCode) => messageCode.slice(0, 3);

const log = (messageCode) => {
  const now = moment();
  const path = `${__dirname}/../logs/${now.get('year')}/${padLeft2(1 + now.get('month'))}/${padLeft2(now.get('date'))}`;
  fs.mkdirSync(path, { recursive: true });
  fs.appendFileSync(
    `${path}/${padLeft2(now.get('hour'))}h00.txt`,
    `${now.format('HH:mm:ss')} - [${messageCode}]: ${Messages[messageCode]}\n\n`,
  );
};


export const defaultSuccess = (res, responseData, status = 200) => res.status(status).json({
  status: 'ok',
  data: responseData,
});
export const defaultError = (res, messageCode) => {
  log(messageCode);
  return res.status(getStatusCode(messageCode)).json({
    status: 'error',
    messageCode,
    message: Messages[messageCode],
  });
};
