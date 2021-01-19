import notification from 'antd/es/notification';
import moment from 'moment';
import throttle from 'lodash/throttle';

export const year = () => moment().format('YYYY');

export const openNotification = (type, { message, description }) =>
  notification[type]({
    message,
    description
  });

export const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () => isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
};

export function throttledAction(fn) {
  return throttle(fn, 1000, { trailing: false });
}

export function clean(obj) {
  // eslint-disable-next-line no-param-reassign
  Object.keys(obj).forEach(k => !obj[k] && obj[k] !== undefined && delete obj[k]);
  return obj;
}

export const getLicenseInfo = ({ licenses, companies }) => licenseId => {
  const license = [...licenses.getValue().values()].find(obj => obj.id === licenseId);
  // eslint-disable-next-line camelcase
  const company = [...companies.getValue().values()].find(obj => obj.id === license?.company_id);
  return { name: company?.name, license: license?.name, licenseType: license?.subtype };
};

export const getCompanyInfo = ({ companies }) => companyId => {
  const company = [...companies.getValue().values()].find(obj => obj.id === companyId);
  return { name: company?.name, license: company?.phone, licenseType: company?.fax };
};

export const addPrefix = prefix => value => `${prefix}-${value}`;
