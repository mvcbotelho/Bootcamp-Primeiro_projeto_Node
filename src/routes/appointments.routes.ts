import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentsRoutes = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRoutes.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

appointmentsRoutes.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parseDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parseDate,
  );

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ error: 'This appointment is alreaady booked.' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parseDate,
  });

  return res.json(appointment);
});

export default appointmentsRoutes;
