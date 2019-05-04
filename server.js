const elasticsearch = require('elasticsearch');
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

const elasticSearchClient = new elasticsearch.Client({
    "host": "127.0.0.1:9200",
    "log":  "error"
});

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
}



async function indexData() {
    const rawReview = await fs.readFileSync('./sample_data.json');
    const reviews = JSON.parse(rawReview);
    bulkIndex('movie', 'reviews', reviews);

}

indexData();

app.listen(PORT, function() {
    console.log("Server running successfully",  PORT);
})