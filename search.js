const elasticSearchClient = require('./elasticSearchClient');


const search = function search(index, body) {
    return elasticSearchClient.search({index: index, body: body});
};

module.exports = function searchData(value) {
    let body = {
        size: 4, 
        from: 0,
        query: {
            //match_all:{}
            match: {
                Id: {
                    query: value
                }
            }
        }
    }

    search('movie', body).then(results => {
        console.log(results);
    }).catch(console.error);
}