const app = require('./src/app');
const { PORT } = require('./config/config');
require('./src/db');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`%s Server runnin in ${PORT} port`);
});
