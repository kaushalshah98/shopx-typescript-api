const { app, bucket, niql } = require('../../config/connection');
const { CONSTANT } = require('../../shared/constant');

app.get('/getcartitems/:userid', async (req, res) => {
  const cartId = 'CART::' + req.params.userid;
  const query = niql.fromString(
    `SELECT {items.product_id,items.qty,p.name,p.price,p.image,p.quantity,p.description,p.details} 
      AS ${CONSTANT.CART_ITEMS}
      FROM  ${CONSTANT.BUCKET_NAME}  a 
       USE KEYS '${cartId}'
       UNNEST a.${CONSTANT.CART_ITEMS} as items
       JOIN  ${CONSTANT.BUCKET_NAME} 
       p ON KEYS [items.product_id]`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else if (row.length <= 0) {
        res.send(row);
      } else {
        let wishlist = row.map((data) => data.cartitems);
        res.send(wishlist);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.get('/cartsize/:userid', async (req, res) => {
  const cartId = 'CART::' + req.params.userid;

  const query = niql.fromString(
    `SELECT COUNT(items) AS cartsize
    FROM  ${CONSTANT.BUCKET_NAME}  
    USE KEYS '${cartId}'
    UNNEST ${CONSTANT.CART_ITEMS} as items`
  );
  try {
    await bucket.query(query, async (err, row) => {
      if (err) {
        throw err;
      } else {
        let cartsize = row.reduce((cartsize) => cartsize[0].cartsize);
        res.send(cartsize);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.post('/AddTocart', async (req, res) => {
  const { product_id, userid } = req.body;
  const cartId = 'CART::' + userid;

  const query = niql.fromString(`SELECT * FROM ${CONSTANT.BUCKET_NAME} USE KEYS '${cartId}'`);
  try {
    await bucket.query(query, async (err, row) => {
      if (err) {
        throw err;
      } else if (row.length <= 0) {
        doc = {
          cartitems: [
            {
              product_id: product_id,
              qty: 1
            }
          ],
          userid: userid,
          type: 'CART'
        };
        await bucket.insert(cartId, doc, (err, row) => {
          if (err) throw err;
          else res.send(row);
        });
      } else {
        const query = niql.fromString(
          `SELECT list.qty FROM ${CONSTANT.BUCKET_NAME} 
          USE KEYS '${cartId}'
          UNNEST ${CONSTANT.CART_ITEMS} AS list
          WHERE list.product_id = '${product_id}'`
        );
        await bucket.query(query, async (err, row) => {
          if (err) {
            throw err;
          } else if (row.length <= 0) {
            let newitem = {
              product_id: product_id,
              qty: 1
            };
            const query = niql.fromString(
              `UPDATE ${CONSTANT.BUCKET_NAME}
                SET ${CONSTANT.CART_ITEMS} = ARRAY_APPEND( ${CONSTANT.CART_ITEMS},$1) 
                WHERE ${CONSTANT.USER_ID} = '${userid}' 
                AND type = '${CONSTANT.CART_TYPE}'`
            );
            await bucket.query(query, [newitem], (err, row) => {
              if (err) {
                throw err;
              } else {
                res.send(row);
              }
            });
          } else {
            let quantity = ++row[0].qty;
            let query = niql.fromString(
              `UPDATE ${CONSTANT.BUCKET_NAME} AS a
              SET item.qty = ${quantity}
              FOR item IN ${CONSTANT.CART_ITEMS}
              WHEN item.product_id = '${product_id}'
              AND type = '${CONSTANT.CART_TYPE}' AND a.userid = '${userid}'
              END;`
            );
            await bucket.query(query, (err, row) => {
              if (err) {
                throw err;
              } else {
                res.send(row);
              }
            });
          }
        });
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.delete('/emptycart/:userid', async (req, res) => {
  const userid = req.params.userid;
  const cartId = 'CART::' + userid;
  try {
    await bucket.remove(cartId, (err, row) => {
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
app.put('/removecartitem/:userid', async (req, res) => {
  const { product_id } = req.body;
  const userid = req.params.userid;
  const cartId = 'CART::' + userid;

  const query = niql.fromString(
    `UPDATE ${CONSTANT.BUCKET_NAME} a
      USE KEYS '${cartId}'
      SET a.cartitems = ARRAY items FOR items IN a.cartitems
      WHEN items.product_id != '${product_id}'
      END`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else {
        res.send(row);
      }
    });
  } catch (err) {
    res.send(err);
  }
  //method2
  // let query = niql.fromString(
  //     'UPDATE cart' +
  //     ' SET cartitems = ARRAY_REMOVE(cartitems,' +
  //     '{' +
  //     '  "productid": "$1",' +
  //     '  "qty": $2' +
  //     '})' +
  //     'where userid = $3'
  // );
  // await bucket.query(query, [userid, quantity, productid], (err, row) => {
  //     if (err) {
  //         errr = {
  //             Errorcode: err.errno,
  //             ErrorMessage: err.message,
  //             Status: err.code
  //         };
  //         res.send(errr)
  //     } else {
  //         res.send(row)
  //     }
  // });
});
app.put('/updatecartitem/:userid', async (req, res) => {
  const { quantity, product_id } = req.body;
  const userid = req.params.userid;
  const query = niql.fromString(
    `UPDATE ${CONSTANT.BUCKET_NAME}
    SET item.qty =  ${quantity} 
    FOR item IN ${CONSTANT.CART_ITEMS} 
    WHEN item.product_id = '${product_id}' END
    WHERE type= '${CONSTANT.CART_TYPE}' 
    AND userid = '${userid}'`
  );
  try {
    await bucket.query(query, (err, row) => {
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
