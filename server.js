import app from './app';
import routes from './routes';


app.use(routes);


app.listen(process.env.PORT || 6969, () => {
  console.log(`Sova listening on port ${process.env.PORT || 6969}!`);
});
