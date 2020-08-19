const router = require('express').Router();

const Directory = require('../../models/directory.model');

router.route('/:userId/directories').get((req, res) => {
    const userId = req.params.userId;

    Directory.find({ userId })
        .then(directories => res.json(directories))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/directories').post((req, res) => {
    const userId = req.params.userId;
    const { name, mobile } = req.body;
    const newDirectory = new Directory({ name, mobile });
    newDirectory.userId = userId;

    newDirectory.save()
        .then(directory => res.json(directory))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/directories/:id').post((req, res) => {
    Directory.findById(req.params.id)
        .then(directory => {
            const { name, mobile } = req.body;
            directory.name = name;
            directory.mobile = mobile;

            directory.save()
                .then(directory => res.json(directory))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/directories/:id').delete((req, res) => {
    Directory.findByIdAndDelete(req.params.id)
        .then(() => res.json())
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;