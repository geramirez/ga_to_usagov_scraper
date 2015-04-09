var request = require('request'),
    cheerio = require('cheerio')
    parse = require('url-parse')
    Analytics = require('./ga_data');


Analytics.get_query(function(err, data) {
    data.forEach(function(search_item) {
      console.log(search_item)
    });
})


/*
var url = 'http://search.usa.gov/search?affiliate=usagov&query=hillary'
request(url, function(err, resp, body) {
    $ = cheerio.load(body);
    $("#results .url").each(function(i, elem){
        result_url = parse($(this).text(), true).hostname.replace('www.', '')
        console.log(result_url);
    });
});
*/


