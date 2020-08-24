const router = require('express').Router();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const Text = require('../../models/text.model');
const Segment = require('../../models/segment.model');
const Directory = require('../../models/directory.model');

router.route('/:userId/texts').get((req, res) => {
    const userId = req.params.userId;

    Text.find({ userId })
        .then(texts => res.json(texts))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/texts').post((req, res) => {
    const userId = req.params.userId;
    const { name, media, message, status, segmentId } = req.body;
    const newText = new Text({ name, media, message, status });
    newText.userId = userId;
    newText.segmentId = segmentId;

    newText.save()
        .then(text => res.json(text))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:userId/texts/:id').post((req, res) => {
    Text.findById(req.params.id)
        .then(text => {
            const { name, segmentId, media, message } = req.body;
            text.name = name;
            text.segmentId = segmentId;
            text.media = media;
            text.message = message;

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

router.route('/:userId/texts/send/:id').post((req, res) => {
    Text.findById(req.params.id)
        .then(text => {
            const { segmentId, message, media } = text;

            Segment.findById(segmentId)
                .then(segment => {
                    const directoryIds = segment.directoryIds;

                    Directory.find({ _id: { $in: directoryIds } })
                        .then(directories => {
                            directories.forEach(directory => {
                                const { firstName, lastName, mobile } = directory;
                                let newMessage = message.split('{first_name}').join(firstName);
                                newMessage = newMessage.split('{last_name}').join(lastName);

                                const textMessage = {
                                    body: newMessage,
                                    from: '+16606164738',
                                    to: `+1${mobile}` 
                                };

                                if (media) textMessage.mediaUrl = media;
                             
                                client.messages
                                    .create(textMessage)
                                    .then(message => console.log(message.sid));
                            });
                        });
                });

            text.status = 'Sent';

            text.save()
                .then(text => res.json(text))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;