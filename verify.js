
const elasticSearchClient = require('./elasticSearchClient');

function indices() {
    return elasticSearchClient.cat.indices({v: true})
    .then(console.log)
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
  }

module.exports = function verify() {
    console.log(`elasticsearch indices information:`);
    indices();
}