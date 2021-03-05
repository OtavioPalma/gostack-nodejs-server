import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider day appointments', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2021, 2, 1, 8, 0, 0),
    });

    const appointmentTwo = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2021, 2, 1, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 1,
      month: 3,
      year: 2021,
    });

    expect(appointments).toEqual([appointmentOne, appointmentTwo]);
  });
});
