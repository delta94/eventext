const router = require('express').Router();

const Segment = require('../../models/segment.model');

router.route('/:userId/segments').get((req, res) => {
    const userId = req.params.userId;

    Segment.find({ userId })
        .then(segments => res.json(segments))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/segments').post((req, res) => {
    const userId = req.params.userId;
    const { name, directoryIds } = req.body;
    const newSegment = new Segment({ name });
    newSegment.userId = userId;
    newSegment.directoryIds = directoryIds;

    newSegment.save()
        .then(segment => res.json(segment))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/segments/:id').post((req, res) => {
    Segment.findById(req.params.id)
        .then(segment => {
            const { name, directoryIds } = req.body;
            segment.name = name;
            segment.directoryIds = directoryIds;

            segment.save()
                .then(segment => res.json(segment))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/segments/:id').delete((req, res) => {
    Segment.findByIdAndDelete(req.params.id)
        .then(segment => res.json(segment))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;