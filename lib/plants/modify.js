import firebase from '@lib/firebase'

export default function (body, res) {
    //create plant list 
    const { id, nameEn, nameKr, nameRu } = body.plant;
    firebase
        .collection('plants')
        .doc(id)
        .update({ nameEn: nameEn, nameKr: nameKr, nameRu: nameRu })
        .then(ref => {
            return res.json({ ref });
        })
        .catch((error) => {
            res.json({ error });
        });

}