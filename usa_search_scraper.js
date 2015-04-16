var request = require('request'),
    cheerio = require('cheerio')
    parse = require('url-parse'),
    Analytics = require('./ga_data'),
    SiteMap = require('./sitemap.json');


function in_sitemap(value) {
    for (var i = 0; i < Object.keys(SiteMap).length; i++) {
        if (Object.keys(SiteMap)[i] === value)
            return SiteMap[Object.keys(SiteMap)[i]]
    };
    return false
}

function write_data(search_item, urls_found){
    console.log(search_item, urls_found);
}

var base_url = 'http://search.usa.gov/search?affiliate=usagov&query='


Analytics.get_query(function(err, data) {
    data.forEach(function(search_item) {
        request(base_url + search_item, function(err, resp, body) {
            var urls_found = [];
            $ = cheerio.load(body);
            $("#results .url").each(function(i, elem){
                found_url = parse(
                    $(this).text(), true).hostname.replace('www.', '');
                agency = in_sitemap(found_url)
                if (urls_found.indexOf(agency) === -1 && agency)
                    urls_found.push(agency);
            });
            write_data(search_item, urls_found);
        });

    });
});
