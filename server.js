const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;
const verify = require('./verify');
const search = require('./search');
const elasticSearchClient = require('./elasticSearchClient');

const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];
    data.forEach(element => {
        bulkBody.push({
            index: {
                _index: index,
                _type: type,
                _id : element.Id
            }
        });

        bulkBody.push(element);
    });

    console.log(bulkBody);

    elasticSearchClient.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(
        `Successfully indexed ${data.length - errorCount}
         out of ${data.length} items`
      );
    })
    .catch(console.err);

};



async function indexData() {
    const rawReview = await fs.readFileSync('./sample_data.json');
    const reviews = JSON.parse(rawReview);
    bulkIndex('movie', 'reviews', reviews);

}

//indexData();
//verify();

search('rotten_tomatoes');

app.listen(PORT, function() {
    console.log("Server running successfully",  PORT);
})