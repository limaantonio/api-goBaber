// import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMontAvalabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointements = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);
      const appointementInDay = appointements.filter(appointement => {
        return getDate(appointement.date) === day;
      });

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointementInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMontAvalabilityService;
