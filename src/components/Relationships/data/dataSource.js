/* eslint-disable max-len */
export const clientDocuments = [
  {
    id: 1,
    name: 'Business Information Profile (BIP)',
    internal: true,
    type: 'General',
    frequency: 'One-Time',
    nextDueDate: '12/25/2018'
  },
  {
    id: 2,
    name: 'Limited Liability Company Resolution',
    internal: false,
    type: 'General',
    frequency: 'One-Time',
    nextDueDate: '12/25/2018'
  },
  {
    id: 3,
    name: 'Last 3 Months Bank Statements',
    internal: true,
    type: 'Entity',
    frequency: 'One-Time',
    nextDueDate: '12/25/2018'
  },
  {
    id: 4,
    name: 'Historical DBA List',
    internal: true,
    type: 'General',
    frequency: 'One-Time',
    nextDueDate: '12/25/2018'
  },
  {
    id: 5,
    name: 'Customer Information (CI)',
    internal: false,
    type: 'Financials',
    frequency: 'One-Time',
    nextDueDate: '12/25/2018'
  },
  {
    id: 6,
    name: 'Federal Tax Identification Number',
    internal: false,
    type: 'Licensing',
    frequency: 'One-Time',
    nextDueDate: '12/25/2018'
  }
];

export const contacts = [
  {
    id: 1,
    name: 'Dominik Doudny',
    email: 'ssss@gmail.com',
    phone: '(000) 000-0000',
    documents: true,
    financials: false
  },
  { id: 2, name: 'Meysam Nassour', email: 'asd@asda.com', phone: '(303) 565-3600', documents: false, financials: true },
  {
    id: 3,
    name: 'Rutherford Brannan',
    email: 'xid25x@gmail.com',
    phone: '(888) 555-0001',
    documents: true,
    financials: true
  }
];

export const owners = [
  { id: 1, name: 'Salomé Fernán', ownership: '10%' },
  { id: 2, name: 'Wen Yahui', ownership: '90%' }
];

export const debtholders = [
  { id: 1, name: 'Amelia Cabal' },
  { id: 2, name: 'Marleah Eagleston' },
  { id: 3, name: 'Siri Jakobsson' }
];

export const accountSigners = [
  { id: 1, name: 'Alfie Wood' },
  { id: 2, name: 'Magnus Kekhuis' },
  { id: 3, name: 'Paromita Haque' }
];

export const affiliatedCompanies = [
  { id: 1, name: 'Test123 Company', note: 'Test 123 is the Holding Company for Dev. Testing Company' }
];

export const customers = [
  { id: 1, name: 'Chesapeake Alternatives LLC' },
  { id: 2, name: 'Culta, LLC' },
  { id: 3, name: 'Curio Cultivation LLC' },
  { id: 4, name: 'Forward Gro' }
];

export const vendors = [
  { id: 1, name: 'AFS Maryland LLC' },
  { id: 2, name: 'Chesapeake Alternatives LLC' },
  { id: 3, name: 'Culta, LLC' },
  { id: 4, name: 'Curaleaf Maryland, Inc' }
];

export const annualReviews = [
  {
    id: 1,
    number: 'AR-44',
    date: '6/1/2019',
    status: 'Approved',
    dateCompleted: '3/26/2019',
    createdDate: '3/25/2019'
  },
  {
    id: 2,
    number: 'AR-1',
    date: '8/16/2019',
    status: 'Approved',
    dateCompleted: '3/26/2019',
    createdDate: '3/21/2019'
  },
  { id: 3, number: 'AR-55', date: '6/22/2019', status: 'New', dateCompleted: '3/26/2019', createdDate: '5/25/2019' }
];

export const statuses = [
  { label: 'All', value: '' },
  { label: 'Active', value: '1' },
  { label: 'Inactive', value: '0' }
];

export const customerStatuses = [
  { label: 'All', value: '' },
  { label: 'Qualified Lead', value: 'qualified_lead' },
  { label: 'Applicant', value: 'applicant' },
  { label: 'Pending Customer', value: 'pending_customer' },
  { label: 'Customer', value: 'customer' },
  { label: 'Denied Customer', value: 'denied_customer' },
  { label: 'Former Customer', value: 'former_customer' }
];

export const entityTypes = [
  { label: 'All', value: '' },
  { label: 'Corporation', value: 'corporation' },
  { label: 'LLC', value: 'llc' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Sole Proprietor', value: 'sole_proprietor' }
];

export const businessTypes = [
  { label: 'All', value: '' },
  { label: 'MRB', value: 'mrb' },
  { label: 'MRB Related', value: 'mrb_related' },
  { label: 'Ancillary', value: 'ancillary' },
  { label: 'Hemp', value: 'hemp' },
  { label: 'Investment', value: 'investment' }
];

const regions = [
  'AK',
  'AL',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
  'Washington, DC'
];

export const stateOfIncorporation = regions.map(v => ({ label: v, value: v }));
