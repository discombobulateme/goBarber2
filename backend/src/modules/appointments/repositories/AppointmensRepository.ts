import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment) // pass model as a parameter
// async return is ALWAYS a Promise<>
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      // where = a sort of query, it searches soomething
      where: { date },
    });

    return findAppointment || null;
  }
}
// other ways to write it:
// findByDate(date).then(response =>) where the response is the Promisse
// const response = await findByDate(date) response will be also Promisse or Null
export default AppointmentsRepository;
