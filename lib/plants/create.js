import firebase from '@lib/firebase'
import moment from "moment"

export default function (body, res) {
    //create plant list 

    firebase
        .collection('plants')
        .add({
            createdTime: moment().toDate(),
            order: 1,
            ...body.plant
        })
        .then(ref => {

            return res.json({ ref });
        })
        .catch((error) => {
            res.json({ error });
        });

}