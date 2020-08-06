import db from '../../../../utils/db/firebase_db'
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

export default (req, res) => {
    const userInfo = JSON.parse(req.body)
    return new Promise((resolve, reject) => {
      db
        .collection('users')
        .doc(userInfo.userId)
        .set({
            username: "",
            name: "",
            email: userInfo.email,
            description: "",
            creationDate: firebase.firestore.FieldValue.serverTimestamp(),
            lastAccessDate: firebase.firestore.FieldValue.serverTimestamp(),
            claps:0,
            confuseds: 0,
            eyvallahs: 0,
            likes: 0,
            location: "",
            photoImageURL: "",
            reputation: 0,
            upvotes: [], 
        })
        .then((doc) => {
            const data = doc.data();
            res.json({status:"success"})
            resolve()
        })
        .catch((error) => {
          res.json({ error });
          res.status(405).end();
          resolve();
        });

    })
};