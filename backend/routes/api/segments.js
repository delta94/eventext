const router = require('express').Router();

const Segment = require('../../models/segment.model');

router.route('/').get((req, res) => {
    Segment.find()
        .then(segments => res.json(segments))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/').post((req, res) => {
    const { name, directoryIds } = req.body;
    const newSegment = new Segment({ name });
    newSegment.directoryIds = directoryIds;
   
    newSegment.save()
        .then(segment => res.json(segment))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').post((req, res) => {
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

router.route('/:id').delete((req, res) => {
    Segment.findByIdAndDelete(req.params.id)
        .then(() => res.json())
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;