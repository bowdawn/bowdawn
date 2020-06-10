import firebase from '@lib/firebase'

export default function (body, res) {
    //create plant list 
    const { id, nameEn, nameKr, nameRu, order } = body.plant;
    firebase
        .collection('plants')
        .doc(id)
        .update({ nameEn: nameEn, nameKr: nameKr, nameRu: nameRu, order: order })
        .then(ref => {
            return res.json({ ref });
        })
        .catch((error) => {
            res.json({ error });
        });

}