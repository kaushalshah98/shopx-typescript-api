const { app, bucket, niql } = require('../../config/connection');
const { CONSTANT } = require('../../shared/constant');

app.get('/theme/:userid', async (req, res) => {
  const userid = req.params.userid;
  const query = niql.fromString(
    `SELECT ${CONSTANT.NIGHT_THEME} 
    FROM  ${CONSTANT.BUCKET_NAME} 
    USE KEYS '${userid}'`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else {
        res.send(row[0]);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.put('/changetheme/:userid', async (req, res) => {
  const userid = req.params.userid;
  const { night_theme } = req.body;
  const query = niql.fromString(
    `UPDATE ${CONSTANT.BUCKET_NAME}
      USE KEYS '${userid}'
      set night_theme= ${night_theme}`
  );
  try {
    await bucket.query(query, async (err, row) => {
      if (err) {
        throw err;
      } else {
        res.send(row);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
