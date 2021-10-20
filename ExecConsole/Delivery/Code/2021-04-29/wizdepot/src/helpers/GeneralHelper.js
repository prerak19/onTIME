
const isBrowser = typeof window !== 'undefined';

export const activity_types = [{ 'code': '10', 'name': 'Duty' }, { 'code': '20', 'name': 'G&A' }, { 'code': '30', 'name': 'OH' }, { 'code': '40', 'name': 'PTO' }, { 'code': '50', 'name': 'Holiday' }, { 'code': '60', 'name': 'LWOP' }, { 'code': '70', 'name': 'Extra Mile' }, { 'code': '80', 'name': 'Other' }];
export const activity_types_codes = { '10': 'Duty', '20': 'G&A', '30': 'OH', '40': 'PTO', '50': 'Holiday', '60': 'LWOP', '70': 'Extra Mile', '80': 'Other' };

export const activity_status = [{ 'code': '100', 'name': 'Active' }, { 'code': '200', 'name': 'Inactive' }, { 'code': '300', 'name': 'Deleted' }];
export const activity_status_codes = { '100': 'Active', '200': 'Inactive', '300': 'Deleted' };

export const user_status = [{ 'code': '100', 'name': 'Active' }, { 'code': '200', 'name': 'Inactive' }, { 'code': '300', 'name': 'Terminated' }, { 'code': '500', 'name': 'Archived' }, { 'code': '900', 'name': 'Email-Verifying' }];
export const user_status_codes = { '100': 'Active', '200': 'Inactive', '300': 'Terminated', '500': 'Archived', '900': 'Email-Verifying' };

export const timesheet_status = [{ 'code': '100', 'name': 'Active' }, { 'code': '200', 'name': 'Inactive' }, { 'code': '300', 'name': 'Submitted' }, { 'code': '400', 'name': 'Approvable' }, { 'code': '500', 'name': 'Approved' }, { 'code': '600', 'name': 'Archivable' }, { 'code': '700', 'name': 'Archived' }];
export const timesheet_status_codes = { '100': 'Active', '200': 'Inactive', '300': 'Submitted', '400': 'Approvable', '500': 'Approved', '600': 'Archivable', '700': 'Archived' };

export const punchTypes = { '1': 'Punch In', '2': 'Punch Out', '3': 'All' };

export const roundTypes = { '1': 'Round Up', '2': 'Round Down', '3': 'Split Round' };

export const userTypes = { '0': 'Not Employee', '1': 'Normal Employee', '2': 'Manager' };

export const employeeStatus = { 'active': 1, 'inactive': 2, 'both': 3 };

export const wayToPack = { 'alphabet': 10, 'group-alphabet': 21, 'group-wage': 22, 'wage': 30 };

export const adminTypes = { '0': 'Not Admin', '50': 'Administrator', '80': 'Super User', '90': 'Root Super User' };

export const employeeTypes = [{ 'code': '10', 'name': 'Salaried' }, { 'code': '20', 'name': 'Full-Time Hourly' }, { 'code': '30', 'name': 'Part-Time Hourly' }, { 'code': '40', 'name': 'Temporary' }, { 'code': '50', 'name': 'Intern' }, { 'code': '60', 'name': 'SubContractor' }];
export const employeeTypes_codes = { '0': 'Not Employee', '10': 'Salaried', '20': 'Full-Time Hourly', '30': 'Part-Time Hourly', '40': 'Temporary', '50': 'Intern', '60': 'SubContractor' };

export const wageCategory = [{ 'code': '1', 'name': 'Exempt' }, { 'code': '2', 'name': 'Non-exempt' }, { 'code': '3', 'name': 'Other' }];
export const wageCategory_codes = { '0': 'N/A', '1': 'Exempt', '2': 'Non-exempt', '3': 'Other' };

export const timingMethod = { '1': 'Punch in/out', '2': 'Manually Enter' };

export const DAYS_OF_WEEK = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' };
export const ClockInOuts = { 1: 'IN', 2: 'OUT' }

export const isSmallScreenFunction = () => {
    const mediaQuery = `(max-width:767px)`;
    return isBrowser && window.matchMedia && isBrowser && window.matchMedia(mediaQuery).matches;
}

export const subStringVal = (value = '', length = 4) => {
    return value.length > 4 ? value.substring(0, length) + '...' : value;
}

export const toNumber = (numHr) => Number(numHr).toFixed(2);

export const stateDetails = [
    { value: 'State', label: "State" },
    { value: 'AL', label: 'Alabama - AL' },
    { value: 'AK', label: 'Alaska - AK' },
    { value: 'AL', label: 'Alabama - AL' },
    { value: 'AZ', label: 'Arizona - AZ' },
    { value: 'AR', label: 'Arkansas - AR' },
    { value: 'CA', label: 'California - CA' },
    { value: 'CO', label: 'Colorado - CO' },
    { value: 'CT', label: 'Connecticut - CT' },
    { value: 'DE', label: 'Delaware - DE' },
    { value: 'DC', label: 'District of Columbia - DC' },
    { value: 'FL', label: 'Florida - FL' },
    { value: 'GA', label: 'Georgia - GA' },
    { value: 'HI', label: 'Hawaii - HI' },
    { value: 'ID', label: 'Idaho - ID' },
    { value: 'IL', label: 'Illinois - IL' },
    { value: 'IN', label: 'Indiana - IN' },
    { value: 'IA', label: 'Iowa - IA' },
    { value: 'KS', label: 'Kansas - KS' },
    { value: 'KY', label: 'Kentucky - KY' },
    { value: 'LA', label: 'Louisiana - LA' },
    { value: 'ME', label: 'Maine - ME' },
    { value: 'MD', label: 'Maryland - MD' },
    { value: 'MA', label: 'Massachusetts - MA' },
    { value: 'MI', label: 'Michigan - MI' },
    { value: 'MN', label: 'Minnesota - MN' },
    { value: 'MS', label: 'Mississippi - MS' },
    { value: 'MO', label: 'Missouri - MO' },
    { value: 'MT', label: 'Montana - MT' },
    { value: 'NE', label: 'Nebraska - NE' },
    { value: 'NV', label: 'Nevada - NV' },
    { value: 'NH', label: 'New Hampshire - NH' },
    { value: 'NJ', label: 'New Jersey - NJ' },
    { value: 'NM', label: 'New Mexico - NM' },
    { value: 'NY', label: 'New York - NY' },
    { value: 'NC', label: 'North Carolina - NC' },
    { value: 'ND', label: 'North Dakota - ND' },
    { value: 'OH', label: 'Ohio - OH' },
    { value: 'OK', label: 'Oklahoma - OK' },
    { value: 'OR', label: 'Oregon - OR' },
    { value: 'PA', label: 'Pennsylvania - PA' },
    { value: 'PR', label: 'Puerto Rico - PR' },
    { value: 'RI', label: 'Rhode Island - RI' },
    { value: 'SC', label: 'South Carolina - SC' },
    { value: 'SD', label: 'South Dakota - SD' },
    { value: 'TN', label: 'Tennessee - TN' },
    { value: 'TX', label: 'Texas - TX' },
    { value: 'UT', label: 'Utah - UT' },
    { value: 'VT', label: 'Vermont - VT' },
    { value: 'VA', label: 'Virginia - VA' },
    { value: 'WA', label: 'Washington - WA' },
    { value: 'WV', label: 'West Virginia - WV' },
    { value: 'WI', label: 'Wisconsin - WI' },
    { value: 'WY', label: 'Wyoming - WY' },
]
