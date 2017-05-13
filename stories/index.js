import { MemoryRouter } from 'react-router';


if (typeof MemoryRouter !== 'undefined') {
  require('./V4/index');
}
else {
  require('./V3/index');
}
