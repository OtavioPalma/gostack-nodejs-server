import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  const fakeAppointmentsRepository = new FakeAppointmentsRepository();
  const createAppointment = new CreateAppointmentService(
    fakeAppointmentsRepository,
  );

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const date = new Date(2021, 3, 10, 11);

    await createAppointment.execute({
      date: date,
      provider_id: '123456789',
    });

    expect(
      createAppointment.execute({
        date: date,
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
