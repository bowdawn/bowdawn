import firebase from '@lib/firebase'
export default (req, res) => {
    const { nameEn, nameKr, nameRu } = JSON.parse(req.body);
    firebase
        .collection('plants')
        .add({
            nameEn,
            nameRu,
            nameKr,
        })
        .then(ref => {
            console.log('Added document with ID: ', ref.id);
            return res.json({ ref });
        })
        .catch((error) => {
            res.json({ error });
        });
};