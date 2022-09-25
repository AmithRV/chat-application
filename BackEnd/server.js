import express from 'express';
import mongoose from 'mongoose';
import messageContent from './dbMessages.js';
import users from './dbUsers.js';
import cors from 'cors';
import Pusher from 'pusher';

const app = express();

app.use(express.json())
app.use(cors());

const port = process.env.PORT || 8000;

const dbPassword = 'Amith123';
const connection_url = `mongodb+srv://admin:${dbPassword}@cluster0.6ksjmgx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(connection_url, (error, client) => {
    if (error) {
        console.log('database connection error : ', error);
    } else {
        console.log('database connected')
    }
});

const pusher = new Pusher({
    appId: "1481829",
    key: "fb9820d492eae1a63e41",
    secret: "7ef70333e31118c60516",
    cluster: "ap2",
    useTLS: true
});

const db = mongoose.connection

db.once('open', () => {
    console.log('CONNECTED');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log('çhange : ', change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message
            })
        } else {
            console.log('Error triggering Pusher');
        }
    });
})

app.get('/', (req, res) => {
    res.send('hello');
    res.end();
});

app.post('/api/new', (req, res) => {
    const message = req.body;
    messageContent.create(message, (error, data) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/api/messages', (req, res) => {
    messageContent.find((error, data) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post('/api/add-user', (req, res) => {
    const user = req.body;
    users.create(user, (error, data) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/api/users', (req, res) => {
    users.find((error, data) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(data);
        }
    });
});

// app.get('/api/user/:id', (req, res) => {
//     res.send('user');
//     res.end();
// });

app.listen(port, () => {
    console.log(`APP RUNNING ON PORT ${port}`)
})