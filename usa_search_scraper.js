var request = require('request'),
    cheerio = require('cheerio')
    parse = require('url-parse')
    Analytics = require('./ga_data');

var base_url = 'http://search.usa.gov/search?affiliate=usagov&query='

Analytics.get_query(function(err, data) {
    data.forEach(function(search_item) {
        request(base_url + search_item, function(err, resp, body) {
            var urls_found = []
            $ = cheerio.load(body);
            $("#results .url").each(function(i, elem){
                found_url = parse(
                    $(this).text(), true).hostname.replace('www.', '');
                urls_found.push(found_url);
            });
            console.log(search_item, urls_found);
        });
    });
});

