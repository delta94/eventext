const router = require('express').Router();

const Text = require('../../models/text.model');

router.route('/').get((req, res) => {
    Text.find()
        .then(texts => res.json(texts))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/').post((req, res) => {
    const { name, image, message, link, status, segmentId } = req.body;
    const newText = new Text({ name, image, message, link, status });
    newText.segmentId = segmentId;

    newText.save()
        .then(text => res.json(text))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').post((req, res) => {
    Text.findById(req.params.id)
        .then(text => {
            const { name, segmentId, image, message, link } = req.body;
            text.name = name;
            text.segmentId = segmentId;
            text.image = image;
            text.message = message;
            text.link = link;

            text.save()
                .then(text => res.json(text))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Text.findByIdAndDelete(req.params.id)
        .then(text => res.json(text))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;