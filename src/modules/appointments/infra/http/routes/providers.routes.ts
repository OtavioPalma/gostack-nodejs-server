import ensureSession from '@modules/users/infra/http/middlewares/ensureSession';
import { celebrate, Joi, Segments } from 'celebrate';
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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  providerDayAvailabilityController.index,
);

providersRouter.post(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);

export default providersRouter;
