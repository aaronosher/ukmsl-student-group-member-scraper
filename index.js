// Copyright (c) 2019 Aaron Osher
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const cheerio = require('cheerio');
const rp = require('request-promise-native');
const tough = require('tough-cookie');

module.exports = config => {

  const url = `${config.baseUrl}/organisation/memberlist/${config.groupId}/`;

  const sessionCookie = new tough.Cookie({
    key: 'ASP.NET_SessionId',
    value: config.ASPNET_SessionId,
    domain: config.domain,
    maxAge: 2147483647,
  });
  
  const authCookie = new tough.Cookie({
    key: '.ASPXAUTH',
    value: config.ASPXAUTH,
    domain: config.domain,
    maxAge: 2147483647,
  });
  ;
  const xsrfCookie = new tough.Cookie({
    key: '__AntiXsrfToken',
    value: config.AntiXsrfToken,
    domain: config.domain,
    maxAge: 2147483647,
  });

  const cookieJar = rp.jar();
  cookieJar.setCookie(sessionCookie.toString(), config.baseUrl);
  cookieJar.setCookie(authCookie.toString(), config.baseUrl);
  cookieJar.setCookie(xsrfCookie.toString(), config.baseUrl);

  const options = {
    method: 'POST',
    uri: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: config.formBody,
    transform: body => {
        return cheerio.load(body);
    },
    jar: cookieJar
  };

  return rp(options)
    .then($ => {
      const members = [];
      $('.msl_table > tbody > tr.msl_row, .msl_table > tbody > tr.msl_altrow').each((i, elem) => {
        let member = {};
        const tempName = $(elem).find('a').text().split(', ');
        member.name = `${tempName[1]} ${tempName[0]}`;
        member.id = $(elem).find('td').next().text();
        members.push(member);
      });
      return members;
    });
}
