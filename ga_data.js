var googleapis = require('googleapis'),
    ga = googleapis.analytics('v3'),
    fs = require('fs'),
    path = require('path');


// Setup
var config = require('./config');
key = fs.readFileSync(config.key_file);
var jwt = new googleapis.auth.JWT(
    config.email,
    null,
    key,
    ['https://www.googleapis.com/auth/analytics.readonly']
);
var query = {
    "dimensions": "ga:eventLabel", //ga:eventAction,ga:eventCategory
    "metrics": "ga:totalEvents",
    "sort": "-ga:totalEvents",
    "filters": "ga:eventAction==did-not-want;ga:totalEvents>0",
    "start-date": "30daysAgo",
    "end-date": "today"
};

query.ids = config.account.ids;
query.auth = jwt;
api_call = ga.data.ga.get;

// Analytics mod
Analytics = {

    get_query: function(callback) {
        jwt.authorize(function(err, result) {
            if (err) return callback(err, null);

            api_call(query, function(err, result) {
                if (err) return callback(err, null);
                callback(null, Analytics.clean_data(result));
            });
        });
    },

    clean_data: function(data) {
        var cleaned_data = [];
        for(row_num in data.rows){
            if (data.rows[row_num][0].length > 4)
                cleaned_data.push(data.rows[row_num][0]);
        }
        return cleaned_data;
    }
}

// Export
module.exports = Analytics;
