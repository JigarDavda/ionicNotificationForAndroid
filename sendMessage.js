const FCM = require('fcm-node');
// Replace these with your own values.
const apiKey = 'AAAAGh9I23s:APA91bEsvCnPbHTnzUzmtcBao6IXd_jcUy7Tjxjv3WWF1Ck6ufyd_49xXWvpU9fxoUX_ywpV7Qt9ab4xZy6kb9DPBDF3O8G2s2wmb4pWjAB0jx29DLatliIsWhIiweX_w-95N7VlZCgjI5d9hdAP9rYb6kPQuxr5Hg';
const deviceID = 'ewxUdNVCLPI:APA91bHd9vlkM7JmMjn71AZD_WG6RGYuY6HjHPdw_oyjgN8e1hHLf2ANAfHAkE1Ju1Ufmh9qYt8MbINhRmyPtrxBy9B7nQSReAwQeF_TrINBni9TfrPGH6W9r8HdVK0Sza5c1aSfpHi-GVJylnWJuOOI_EwjMUSUGg';
const fcm = new FCM(apiKey);

const message = {
  to: deviceID,
  data: {
    title: 'AUX Scrum',
    message:
      'Scrum: Daily touchbase @ 10am Please be on time so we can cover everything on the agenda.',
    actions: [
      {
        icon: 'emailGuests',
        title: 'EMAIL GUESTS',
        callback: 'emailGuests',
        foreground: true
    
       },
      { icon: 'snooze', title: 'SNOOZE', callback: 'snooze', foreground: false }
    ]
  }
};

fcm.send(message, (err, response) => {
  if (err) {
    console.log(err);
    console.log('Something has gone wrong!');
  } else {
    console.log('Successfully sent with response: ', response);
  }
});