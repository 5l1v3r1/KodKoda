import db from '../../utils/db/firebase_db'

export default (req, res) => {
    return new Promise((resolve, reject) => {
        db.collection("posts")
            .where("postType", "==", 1)
            .get().then((snapshot) => {
                res.status(200).send({size: snapshot.size});
                resolve()
            }).catch((error) => {
                res.json({ error });
                resolve();
            }); 
    })
}
