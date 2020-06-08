import firebase from '@lib/firebase'

export default function (body, res) {
    //create plant list 
    const { nameEn, nameKr, nameRu } = body.plant;
    firebase
        .collection('plants')
        .add({
            nameEn,
            nameRu,
            nameKr,
        })
        .then(ref => {

            return res.json({ ref });
        })
        .catch((error) => {
            res.json({ error });
        });

}