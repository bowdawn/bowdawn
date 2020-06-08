import firebase from '@lib/firebase'
export default (req, res) => {
    const { plantId } = JSON.parse(req.body);
    firebase
        .collection('plants').doc(plantId).delete().then(ref => {

            return res.json({ ref })
        })
        .catch((error) => {
            res.json({ error });
        });
};