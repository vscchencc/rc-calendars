# rc-calendars

![bundle Size](https://img.shields.io/bundlephobia/min/rc-calendars)
![license](https://img.shields.io/npm/l/rc-calendars)
![version](https://img.shields.io/npm/v/rc-calendars)

# Feature
* support date, month, year
* support week number

# install
[![NPM](https://nodei.co/npm/rc-calendars.png)](https://nodei.co/npm/rc-calendars/)

# Usage
```
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from 'rc-calendars';

ReactDOM.render(<Calendar />, container);
```

# API 

| name          | type                 | default |
| :-----------  | :------------------: | ------: |
| type          | string               | date    |
| value         | string               |         |
| min           | string               |         |
| max           | string               |         |
| changeValue   | funtion(date:moment) |         |

# Development
```
  npm install
  npm run dev
```

# License
## rc-calendar is released under the MIT license