import firebase from '@lib/firebase'
export default (body, res) => {
    const { plantId } = body;
    console.log(plantId);
    firebase
        .collection('plants').doc(plantId).delete().then(ref => {

            return res.json({ ref })
        })
        .catch((error) => {
            res.json({ error });
        });
};