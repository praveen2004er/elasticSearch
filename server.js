const elasticsearch = require('elasticsearch');
const express = require('express');
const app = express();
const PORT = 5000;

const elasticSearchClient = new elasticsearch.Client({
    "host": "127.0.0.1:9200",
    "log":  "error"
});

app.listen(PORT, function() {
    console.log("Server running successfully",  PORT);
})