// Copyright (c) 2019 Aaron Osher
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports.default = config => {

  const url = `${config.baseUrl}/organisation/memberlist/${config.groupId}/?sort=groups`;
  
  return fetch(url, {
    headers: {
      Cookie: `ASP.NET_SessionId=${config.ASPNET_SessionId}; .ASPXAUTH=${config.ASPXAUTH}; __AntiXsrfToken=${config.__AntiXsrfToken}`,
    },
  })
    .then(res => res.text())
    .then(body => cheerio.load(body))
    .then($ => {
      const members = [];
      $('tr.msl_row > td:nth-child(2)').each((i, el) => members[i] = el.children[0].data);
      return members;
    });
}
