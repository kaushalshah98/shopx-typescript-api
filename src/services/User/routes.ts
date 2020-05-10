// import { Request, Response } from 'express';
// import { app } from '../../config/export';
// import { Repository } from './usermanagement';

// const repo = new Repository();

// const verifyuser = app.get('/verifyuser', async (req: Request, res: Response) => {
//   try {
//     const response = await repo.getallusers();
//     res.send(response);
//   } catch (error) {
//     res.send(error);
//   }
// });
// const getuser = app.put('/getuser/:userid', async (req: Request, res: Response) => {
//   try {
//     const userid: string = req.params.userid;
//     const status: boolean = req.body.status;
//     const response = await repo.blockuser(userid, status);
//     res.send(response);
//   } catch (err) {
//     res.send(err);
//   }
// });
// const forgotpassword = app.put('/forgotpassword', async (req: Request, res: Response) => {
//   try {
//     const userid: string = req.params.userid;
//     const status: boolean = req.body.status;
//     const response = await repo.blockuser(userid, status);
//     res.send(response);
//   } catch (err) {
//     res.send(err);
//   }
// });
// const updateuserdata = app.put('/updateuserdata/:userid', async (req: Request, res: Response) => {
//   try {
//     const userid: string = req.params.userid;
//     const status: boolean = req.body.status;
//     const response = await repo.blockuser(userid, status);
//     res.send(response);
//   } catch (err) {
//     res.send(err);
//   }
// });
// const createuser = app.put('/createuser', async (req: Request, res: Response) => {
//   try {
//     const userid: string = req.params.userid;
//     const status: boolean = req.body.status;
//     const response = await repo.blockuser(userid, status);
//     res.send(response);
//   } catch (err) {
//     res.send(err);
//   }
// });
// const sendmessage = app.put('/sendmessage', async (req: Request, res: Response) => {
//   try {
//     const userid: string = req.params.userid;
//     const status: boolean = req.body.status;
//     const response = await repo.blockuser(userid, status);
//     res.send(response);
//   } catch (err) {
//     res.send(err);
//   }
// });
// export { verifyuser, getuser, forgotpassword, updateuserdata, createuser, sendmessage };
