import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import ensureSession from '../middlewares/ensureSession';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureSession);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      old_password: Joi.string(),
    },
  }),
  profileController.update,
);

export default profileRouter;
