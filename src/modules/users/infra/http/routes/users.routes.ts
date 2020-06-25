import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthentication from '../middlewares/ensureAutheticaded';

const userRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

userRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default userRouter;
