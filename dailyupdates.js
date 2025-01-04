const mongoose = require('mongoose');

const newData = new mongoose.Schema({
    article_id: String,
    title: String,
    link: String,
    description: String,
    content: String,
    pubDate: String,
    image_url: String,
    source_id: String,
    source_priority: Number,
    source_url: String,
    source_icon: String,
    language: String,
    country: Array,
    category: Array,
    ai_tag: String,
    ai_region: String,
    ai_org: String,
    sentiment: String,
    sentiment_stats: String,
});


module.exports = mongoose.model("datas",newData);