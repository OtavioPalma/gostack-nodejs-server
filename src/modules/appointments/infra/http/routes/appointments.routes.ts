import ensureSession from '@modules/users/infra/http/middlewares/ensureSession';
import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureSession);

// appointmentsRouter.get('/', appointmentsController.findAll);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
