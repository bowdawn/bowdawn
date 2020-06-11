import firebase from '@lib/firebase'



export default function (body, res) {
    firebase
        .collection('plants')
        .orderBy("order")
        .orderBy("createdTime", "desc")
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
}