import moment from 'moment';
import app from './app';
import routes from './routes';

require('log-timestamp')(() => `[${moment().utc().subtract({ hour: 3 }).format('YYYY-MM-DD HH:mm:ss A')}]`);


app.use('/app', [], routes);

app.use('/', [], routes);

app.listen(process.env.PORT || 6969, () => {
  console.log(`Sova listening on port ${process.env.PORT || 6969}!`);
});
