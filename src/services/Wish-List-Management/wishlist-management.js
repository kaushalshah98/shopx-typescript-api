const { app, bucket, niql } = require('../../config/connection');
const { CONSTANT } = require('../../shared/constant');

app.get('/getwishlistitems/:userid', async (req, res) => {
  const wishlist_id = 'WISHLIST::' + req.params.userid;
  const query = niql.fromString(
    `SELECT {items.product_id,p.name,p.price,p.image,p.quantity,p.description,p.details} 
      AS ${CONSTANT.WISHLIST_ITEMS}
      FROM  ${CONSTANT.BUCKET_NAME}  a 
       USE KEYS '${wishlist_id}'
       UNNEST a.${CONSTANT.WISHLIST_ITEMS} as items
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
        let wishlist = row.map((data) => data.wishlistitems);
        res.send(wishlist);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.post('/AddToWishlist', async (req, res) => {
  const { product_id, userid } = req.body;
  const wishlist_id = 'WISHLIST::' + userid;

  const query = niql.fromString(`SELECT * FROM ${CONSTANT.BUCKET_NAME} USE KEYS '${wishlist_id}'`);
  try {
    await bucket.query(query, async (err, row) => {
      if (err) {
        throw err;
      } else if (row.length <= 0) {
        doc = {
          wishlistitems: [
            {
              product_id: product_id
            }
          ],
          userid: userid,
          type: 'WISHLIST'
        };
        await bucket.insert(wishlist_id, doc, (err, row) => {
          if (err) throw err;
          else res.send(row);
        });
      } else {
        const query = niql.fromString(
          `SELECT * FROM ${CONSTANT.BUCKET_NAME} 
          USE KEYS '${wishlist_id}'
          UNNEST ${CONSTANT.WISHLIST_ITEMS} as list
          WHERE list.product_id = '${product_id}'`
        );
        try {
          await bucket.query(query, async (err, row) => {
            if (err) {
              throw err;
            } else if (row.length <= 0) {
              let newitem = {
                product_id: product_id
              };
              const query = niql.fromString(
                `UPDATE ${CONSTANT.BUCKET_NAME}
                  SET ${CONSTANT.WISHLIST_ITEMS} = ARRAY_APPEND( ${CONSTANT.WISHLIST_ITEMS},$1) 
                  WHERE ${CONSTANT.USER_ID} = '${userid}' 
                  AND type = '${CONSTANT.WISHLIST_TYPE}'`
              );
              await bucket.query(query, [newitem], (err, row) => {
                if (err) {
                  throw err;
                } else {
                  res.send(row);
                }
              });
            } else {
              let obj = {
                message: 'Already there in list'
              };
              res.send(obj);
            }
          });
        } catch (err) {
          res.send(err);
        }
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.delete('/emptywishlist/:userid', async (req, res) => {
  const userid = req.params.userid;
  const wishlist_id = 'WISHLIST::' + userid;
  try {
    await bucket.remove(wishlist_id, (err, row) => {
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
app.put('/removewishlistitem/:userid', async (req, res) => {
  const { product_id } = req.body;
  const userid = req.params.userid;
  const wishlist_id = 'WISHLIST::' + userid;

  const query = niql.fromString(
    `UPDATE ${CONSTANT.BUCKET_NAME} a
      USE KEYS '${wishlist_id}'
      SET a.wishlistitems = ARRAY items FOR items IN a.wishlistitems
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
  //     'UPDATE wishlist' +
  //     ' SET wishlistitems = ARRAY_REMOVE(wishlistitems,' +
  //     '{' +
  //     '  "product_id": "$1",' +
  //     '  "qty": $2' +
  //     '})' +
  //     'where userid = $3'
  // );
  // await bucket.query(query, [userid, quantity, product_id], (err, row) => {
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
