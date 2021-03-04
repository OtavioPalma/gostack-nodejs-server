import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureSession from '@modules/users/infra/http/middlewares/ensureSession';
import { parseISO } from 'date-fns';
import { Router } from 'express';
import { container } from 'tsyringe';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureSession);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
