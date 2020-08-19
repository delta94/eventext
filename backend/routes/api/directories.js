const router = require('express').Router();

const Directory = require('../../models/directory.model');

router.route('/').get((req, res) => {
    Directory.find()
        .then(directories => res.json(directories))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/').post((req, res) => {
    const { name, mobile } = req.body;
    const newDirectory = new Directory({ name, mobile });

    newDirectory.save()
        .then(directory => res.json(directory))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').post((req, res) => {
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

router.route('/:id').delete((req, res) => {
    Directory.findByIdAndDelete(req.params.id)
        .then(() => res.json())
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;