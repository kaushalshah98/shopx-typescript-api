const { app, bucket, niql, dateformat } = require('../../config/connection');
const { CONSTANT } = require('../../shared/constant');

app.get('/getUserOrder/:userid', async (req, res) => {
  const order_id = 'ORDER::' + req.params.userid;
  const query = niql.fromString(
    `SELECT orders
    FROM  ${CONSTANT.BUCKET_NAME}  
    USE KEYS '${order_id}'`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else if (row.length <= 0) {
        res.send(row);
      } else {
        res.send(row[0].orders);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.get('/getallorders', async (req, res) => {
  const query = niql.fromString(
    `SELECT {u.name,u.profilepic,a.orders} AS orders
    FROM ${CONSTANT.BUCKET_NAME} a
    JOIN ${CONSTANT.BUCKET_NAME} u
    ON KEYS [a.userid]
    WHERE a.type='${CONSTANT.ORDER_TYPE}'`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else {
        let orders = row.map((data) => data.orders);
        res.send(orders);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.post('/addorder/:userid', async (req, res) => {
  const order_id = 'ORDER::' + req.params.userid;
  const userid = req.params.userid;
  let now = new Date();
  let orders = [];
  let order = req.body;
  order.forEach((item) => (item.date = dateformat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT')));
  orders.push(order);
  doc = {
    orders: orders,
    userid: req.params.userid,
    type: 'ORDER'
  };
  const query = niql.fromString(`SELECT * FROM  ${CONSTANT.BUCKET_NAME} USE KEYS '${order_id}'`);
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else if (row.length <= 0) {
        bucket.insert(order_id, doc, (err, row) => {
          if (err) throw err;
          else res.send(row);
        });
      } else {
        const query = niql.fromString(
          `UPDATE ${CONSTANT.BUCKET_NAME}
           SET ${CONSTANT.ORDERS} = ARRAY_APPEND( ${CONSTANT.ORDERS},$1) 
          WHERE ${CONSTANT.USER_ID} = '${userid}' 
          AND type = '${CONSTANT.ORDER_TYPE}'`
        );
        bucket.query(query, [order], (err, row) => {
          if (err) {
            throw err;
          } else {
            res.send(row);
          }
        });
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.put('/removeorder/:userid', async (req, res) => {
  const order_id = 'ORDER::' + req.params.userid;
  doc = {
    orders: req.body,
    userid: req.params.userid,
    type: 'ORDER'
  };

  try {
    await bucket.upsert(order_id, doc, (err, row) => {
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
