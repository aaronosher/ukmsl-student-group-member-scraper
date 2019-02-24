# UKSML Student Group Member List Scraper
Made to scrape University of Nottingham Students' Union Society Member Lists

Scraper submits a post request to get all members of society and then uses cheriojs to get names and ID.

Returns an array of objects that looks like the following:
```JavaScript
[
  {
    name: '<First Name> <Last Name>',
    id: <studentID>,
  },
  ...
]
```

## Usage

Using the scraper requires some configuration.

```JavaScript
const fetchMembers = require('ukmsl-student-group-member-scraper');
const config = require('./config');

fetchMembers(config)
  .then(members => /* do something */)
  .catch(err => /* handle error */);
```

## Config Object
The configuration object is structured as follows

```JavaScript
{
  baseUrl: '',
  domain: '',
  groupId: '',
  ASPNET_SessionId: '',
  ASPXAUTH: '',
  AntiXsrfToken: '',
  formBody: '',
}
```

 - **baseUrl** is the url of the website with the protocol.
 - **domain** is the website's domain name without protocol (for cokies)
 - **groupId** is the ID of the student group which can be found in the URL when viewiing members
 - **ASPNET_SessionId** coresponds to the `ASP.NET_SessionId` cookie set on the website
 - **ASPXAUTH** coresponds to the `.ASPXAUTH` cookie set on the website
 - **AntiXsrfToken** coresponds to the `__AntiXsrfToken` cookie set on the website
 - **formBody** is the source form data on the post request when you can see **all** members

 Note that most of this data is sensitive and can let anyone access your account on a UKSML website.