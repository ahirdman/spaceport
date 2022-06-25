import app from './api/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(process.env);
  console.log(`API listening on port: ${PORT}`);
});
