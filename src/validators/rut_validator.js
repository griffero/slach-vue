import { rutValidator } from 'vue-dni';

const SMALLEST_COMPANY_RUT = 45000000;
const VERIFICATION_CODE_SEPARATOR = '-';
const THOUSAND_SEPARATOR = '.';

const cleanRut = (rut) => {
  const rutWithoutDots = rut.split(THOUSAND_SEPARATOR).join('');
  return rutWithoutDots.split(VERIFICATION_CODE_SEPARATOR).join('');
};

const cleanRutBody = (rut) => cleanRut(rut).slice(0, -1);

const businessRut = (rut) => {
  const hasBusinessBody = cleanRutBody(rut) >= SMALLEST_COMPANY_RUT;
  return rutValidator(rut) && hasBusinessBody;
};

const individualRut = (rut) => {
  const hasIndividualBody = cleanRutBody(rut) <= SMALLEST_COMPANY_RUT;
  return rutValidator(rut) && hasIndividualBody;
};

export {
  individualRut,
  businessRut,
};
