import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAutheticaded';

import AppoitmentController from '../controllers/AppoitmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppoitmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticaded);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
