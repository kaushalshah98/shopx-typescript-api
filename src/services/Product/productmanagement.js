const { app, bucket, niql, uuid } = require('../../config/connection');
const { CONSTANT } = require('../../shared/constant');

app.get('/getallproducts', async (req, res) => {
  const query = niql.fromString(
    `SELECT ${CONSTANT.BUCKET_NAME} as product 
      FROM  ${CONSTANT.BUCKET_NAME} 
      WHERE type = '${CONSTANT.PRODUCT_TYPE}'`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else {
        let products = row.map((data) => data.product);
        res.send(products);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.post('/getproducts', async (req, res) => {
  const { category, innercategory } = req.body;
  const query = niql.fromString(
    `SELECT ${CONSTANT.BUCKET_NAME} as product 
      FROM  ${CONSTANT.BUCKET_NAME} 
      WHERE type = '${CONSTANT.PRODUCT_TYPE}'
      AND ${CONSTANT.PRODUCT_INNERCATEGORY} = '${innercategory}'
      AND ${CONSTANT.PRODUCT_CATEGORY} ='${category}'`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else {
        let products = row.map((data) => data.product);
        res.send(products);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.post('/addproduct', async (req, res) => {
  const productdoc = req.body;
  const product_id = 'PRODUCT::' + uuid.v4();
  productdoc.product_id = product_id;
  productdoc.type = 'PRODUCT';
  // method 1
  try {
    await bucket.insert(product_id, productdoc, (err, row) => {
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
app.delete('/removeproduct/:productid', async (req, res) => {
  const product_id = req.params.productid;
  try {
    await bucket.remove(product_id, (err, row) => {
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
app.get('/getproduct/:productid', async (req, res) => {
  const product_id = req.params.productid;
  const query = niql.fromString(
    `SELECT ${CONSTANT.BUCKET_NAME} as product 
      FROM  ${CONSTANT.BUCKET_NAME} 
      USE KEYS '${product_id}'`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else {
        let product = row.map((data) => data.product);
        res.send(product[0]);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.put('/updateproduct/:productid', async (req, res) => {
  const product_id = req.params.productid;
  const productdoc = req.body;
  productdoc.product_id = product_id;
  productdoc.type = 'PRODUCT';
  try {
    await bucket.upsert(product_id, productdoc, (err, row) => {
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
