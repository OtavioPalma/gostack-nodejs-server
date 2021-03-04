import ensureSession from '@modules/users/infra/http/middlewares/ensureSession';
import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureSession);
providersRouter.get('/', providersController.index);

export default providersRouter;
