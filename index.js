
'use strict';
const req = require('request');
const moment = require('moment');
const queryString = require('query-string');

class OpenWeather {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.loc = '';
        this.query = {}
    }

    location(city) {
        // Used to search for a specific location.

        !city ? null : this.loc = city;
        return this;
    }

    time(val) {
        // Unique ID that can be used to search for a specific location.

        !val ? this.time = 'hourly/1hour' : this.time = val;
        return this;
    }

    language(lan) {
        // String indicating the language in which to return the resource.
        // Default value set to en-us.

        !lan ? null : this.query.language = lan;
        return this;
    }

    details(bool) {
        // Boolean value (true or false) specifies whether or not to include the full object.
        //Default value set to false.

        !bool ? null : this.query.details = bool;
        return this;
    }

    metric(bool) {
        // Boolean value (true or false) that specifies to return the data in either metric (=true) or imperial units.

        !bool ? null : this.query.metric = bool;
        return this;
    }

    generateReqUrl() {
        this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.loc}&appid=${this.apiKey}`;
        this.query ? this.url += `&${queryString.stringify(this.query)}` : this.url;
    }

    get() {
        return new Promise((resolve, reject) => {
            this.generateReqUrl();
            req({ url: this.url, json: true }, (err, res, body) => {
                err ? reject(`Forecast cannot be retrieved. ERROR: ${err}`) : null;
                res.statusCode !== 200 ? reject(`Forecast cannot be retrieved. Response: ${res.statusCode} ${res.statusMessage}`) : null;
                resolve(body)
            })
        })
    }
}
module.exports = OpenWeather