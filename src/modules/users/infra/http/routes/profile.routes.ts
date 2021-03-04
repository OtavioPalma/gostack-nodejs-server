import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import ensureSession from '../middlewares/ensureSession';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureSession);
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
