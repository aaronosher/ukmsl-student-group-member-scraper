const config = require('./config');
const formBody = require('./formBody');

const fetchMembers = require('./index');

const myConfig = config;
myConfig.formBody = formBody;

fetchMembers(myConfig)
  .then(members => console.log(members))
  .catch(err => console.error(err));