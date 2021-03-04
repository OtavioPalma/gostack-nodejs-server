import ensureSession from '@modules/users/infra/http/middlewares/ensureSession';
import { Router } from 'express';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureSession);
providersRouter.get('/', providersController.index);
providersRouter.post(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);
providersRouter.post(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

export default providersRouter;
