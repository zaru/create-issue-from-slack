import express from 'express';
import * as bodyParser from 'body-parser';
import axios from 'axios';
import qs from 'qs';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World'));

app.post('/', (req, res) => {
    const payload = JSON.parse(req.body.payload);
    const {type, user, submission} = payload;
    const dialogData = {
        token: process.env.SLACK_ACCESS_TOKEN,
        trigger_id: payload.trigger_id,
        dialog: JSON.stringify({
          title: 'Save it to ClipIt!',
          callback_id: 'clipit',
          submit_label: 'ClipIt',
          elements: [
            {
              label: 'Message Text',
              type: 'textarea',
              name: 'message',
              value: payload.message.text
            },
            {
              label: 'Importance',
              type: 'select',
              name: 'importance',
              data_source: 'users'
            },
          ]
        })
      };
      
      // open the dialog by calling the dialogs.open method and sending the payload
      axios.post('https://slack.com/api/dialog.open', qs.stringify(dialogData))
        .then((result) => {
            if(result.data.error) {
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
         })
        .catch((err) => {
            res.sendStatus(500);
        });
});

app.listen(3000, () => console.log('Example app listening on port 3000'));

export default app;