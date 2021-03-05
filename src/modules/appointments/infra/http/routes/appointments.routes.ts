import ensureSession from '@modules/users/infra/http/middlewares/ensureSession';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureSession);

// appointmentsRouter.get('/', appointmentsController.findAll);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.required(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.post('/provider', providerAppointmentsController.index);

export default appointmentsRouter;
