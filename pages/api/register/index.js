import firebase from '@lib/firebase'
export default (req, res) => {
    firebase
        .collection('plants')
        .get()
        .then(snapshot => {
            let data = [];
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                data.push(Object.assign({
                    id: doc.id
                }, doc.data()));
            });
            return (res.json({ plants: data }));
        })
        .catch((error) => {
            res.json({ error });
        });
};