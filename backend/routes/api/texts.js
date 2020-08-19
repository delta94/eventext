const router = require('express').Router();

const Text = require('../../models/text.model');

router.route('/:userId/texts').get((req, res) => {
    const userId = req.params.userId;

    Text.find({ userId })
        .then(texts => res.json(texts))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/texts').post((req, res) => {
    const userId = req.params.userId;
    const { name, image, message, link, status, segmentId } = req.body;
    const newText = new Text({ name, image, message, link, status });
    newText.userId = userId;
    newText.segmentId = segmentId;

    newText.save()
        .then(text => res.json(text))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/texts/:id').post((req, res) => {
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

router.route('/:userId/texts/:id').delete((req, res) => {
    Text.findByIdAndDelete(req.params.id)
        .then(text => res.json(text))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;