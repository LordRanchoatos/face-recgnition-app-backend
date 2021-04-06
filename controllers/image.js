const json = require('body-parser/lib/types/json');
const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: "df791b8fb10540bd8a2a6dbea354d5b9"
  });

const handleApiCall = (req, res) => {
app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(data => {
        console.log(data)
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleimage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment("entries", 1)
        .returning("entries")
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
    handleimage,
    handleApiCall
}