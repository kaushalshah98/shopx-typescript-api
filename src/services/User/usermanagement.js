app.post('/verifyuser', async (req, res) => {
  const { name, password } = req.body;
  const query = niql.fromString(
    `SELECT ${CONSTANT.BUCKET_NAME} as \`user\` 
    FROM  ${CONSTANT.BUCKET_NAME} 
    WHERE name= '${name}' and \`password\`= '${password}' 
    AND type = '${CONSTANT.USER_TYPE}'`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else if (row.length <= 0) {
        res.send(row);
      } else {
        let user = row.map((userdata) => userdata.user);
        res.send(user[0]);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.get('/getuser/:userid', async (req, res) => {
  const userid = req.params.userid;
  const query = niql.fromString(
    `SELECT * FROM ${CONSTANT.BUCKET_NAME} as \`user\`
      USE KEYS '${userid}'`
  );
  try {
    await bucket.query(query, async (err, row) => {
      if (err) {
        throw err;
      } else {
        let user = row.map((userdata) => userdata.user);
        res.send(user[0]);
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.post('/forgotpassword', async (req, res) => {
  const { name, email } = req.body;
  const query = niql.fromString(
    `SELECT \`password\` 
    FROM  ${CONSTANT.BUCKET_NAME} 
    WHERE name= '${name}' and email= '${email}' 
    AND type = '${CONSTANT.USER_TYPE}'`
  );
  try {
    await bucket.query(query, (err, row) => {
      if (err) {
        throw err;
      } else if (row.length <= 0) {
        res.send(row);
      } else {
        const receiver = email;
        const message = `Your Password is ${row[0].password}`;
        const subject = `Hello ${name}`;
        res.send(row);
        sendmail(receiver, subject, message, (res) => {});
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.put('/updateuserdata/:userid', async (req, res) => {
  const userid = req.params.userid;
  const { name, password, email, profilepic } = req.body;
  const query = niql.fromString(
    `UPDATE ${CONSTANT.BUCKET_NAME}
      USE KEYS '${userid}'
      set name='${name}',\`password\` = '${password}', 
      email= '${email}',profilepic ='${profilepic}'`
  );
  try {
    await bucket.query(query, async (err, row) => {
      if (err) {
        throw err;
      } else {
        await bucket.get(userid, (err, rows) => {
          if (err) {
            throw err;
          } else {
            res.send(rows.value);
          }
        });
      }
    });
  } catch (err) {
    res.send(err);
  }
});
app.post('/createuser', async (req, res) => {
  const userdoc = req.body;
  const userid = 'USER::' + uuid.v4();
  userdoc.userid = userid;
  userdoc.role = 'user';
  userdoc.type = 'USER';
  userdoc.night_theme = false;
  const receiver = userdoc.email;
  const message = `Helllo ${userdoc.name}`;
  const subject = 'Welcome To Shopx';
  // method 1
  try {
    await bucket.insert(userid, userdoc, (err, row) => {
      if (err) {
        throw err;
      } else {
        res.send(row);
        sendmail(receiver, subject, message, (res) => {
          console.log(`Mail has sent successfully and ID is ${res.messageId}`);
        });
      }
    });
  } catch (err) {
    res.send(err);
  }
  //method 2
  // let query = niql.fromString("INSERT INTO `user` (KEY,VALUE) VALUES ($1, $2)");
  // console.log(query);
  // user_await bucket.query(query, [userid, userdoc], (err, row) => {
  //     if (err) {
  //         errr = {
  //             Errorcode: err.errno,
  //             ErrorMessage: err.message,
  //             Status: err.code
  //         };
  //         res.send(errr)
  //         console.log(err)
  //     } else {
  //         console.log(row);
  //     }
  // });
});
app.post('/sendmessage', async (req, res) => {
  const { subject, message } = req.body;
  const receiver = 'shopx589@gmail.com';
  sendmail(receiver, subject, message, (response) => {
    res.send();
  });
});

