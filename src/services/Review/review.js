const { app, bucket, niql } = require('../../config/connection');
const { CONSTANT } = require('../../shared/constant');

app.get('/getreviews/:product_id', async (req, res) => {
  const review_id = 'REVIEW::' + req.params.product_id;
  const query = niql.fromString(
    `SELECT list
    FROM  ${CONSTANT.BUCKET_NAME}  
    USE KEYS '${review_id}'`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else if (row.length <= 0) {
        res.send(row);
      } else {
        res.send(row[0].list);
      }
    });
  } catch (err) {
    res.send(err);
  }
});

app.post('/addreview/:product_id', async (req, res) => {
  const review_id = 'REVIEW::' + req.params.product_id;
  const reviewarray = req.body;
  const doc = {
    list: reviewarray,
    product_id: req.params.product_id,
    type: 'REVIEW'
  };
  try {
    await bucket.upsert(review_id, doc, (err, row) => {
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
