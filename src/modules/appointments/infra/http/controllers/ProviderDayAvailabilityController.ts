import { Response, Request } from 'express';

import { container } from 'tsyringe';

import ListProviderDyAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDyAvailabilityService,
    );

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(availability);
  }
}
