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
    "dimensions": "ga:pagePath",
    "metrics": "ga:users",
    "sort": "-ga:users",
    "filters": "ga:pagePath=~/agencies/.?query=",
    "start-date": "30daysAgo",
    "end-date": "today"
};

query.ids = config.account.ids;
query.auth = jwt;
api_call = ga.data.ga.get;

// Analytics mod
Analytics = {

    // Get query from google analytics
    get_query: function(callback) {
        jwt.authorize(function(err, result) {
            if (err) return callback(err, null);

            api_call(query, function(err, result) {
                if (err) return callback(err, null);
                callback(null, Analytics.clean_data(result));
            });
        });
    },
    // Clean the data
    clean_data: function(data) {
        var cleaned_data = [];
        for(row_num in data.rows){
            query = data.rows[row_num][0].replace('/agencies/?query=', '');
            if (query.length > 3)
                cleaned_data.push(decodeURIComponent(query).replace('+',''));
        }
        return cleaned_data;
    }
}

// Export
module.exports = Analytics;
