import {Router} from 'express';
import protectedRoute from '../../middleware/protected.middleware.ts';
import getuserController from '../../controller/messages/getuser.controller.ts';
import getmessagesController from '../../controller/messages/getmessages.controller.ts';
import sentmessages from '../../controller/messages/sentmessages.ts';

const messageRoute = Router();

messageRoute.get("/user",protectedRoute,getuserController.getusers);
messageRoute.get("/:id",protectedRoute,getmessagesController.getchat)
messageRoute.post("/send/:id",protectedRoute,sentmessages.send)

export default messageRoute;