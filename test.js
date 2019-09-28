// Copyright (c) 2019 Aaron Osher
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const config = require('./config');

const fetchMembers = require('./index').default;

const myConfig = config;

fetchMembers(myConfig)
  .then(console.log)
  .catch(console.error);