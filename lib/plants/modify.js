import firebase from '@lib/firebase'

export default function (body, res) {
    const { id, ...plant } = body.plant;
    firebase
        .collection('plants')
        .doc(id)
        .update(plant)
        .then(ref => {
            return res.json({ ref });
        })
        .catch((error) => {
            res.json({ error });
        });

}