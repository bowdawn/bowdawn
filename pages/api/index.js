import firebase from '@lib/firebase'
import createPlant from "@lib/plants/create"
import deletePlant from "@lib/plants/delete"
import modifyPlant from "@lib/plants/modify"
export default (req, res) => {
    const body = JSON.parse(req.body);
    console.log(body);
    //get plant list
    if (body.method === "getPlantList") {
        firebase
            .collection('plants')
            .orderBy("order")
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


    if (body.method === "deletePlant") {
        return deletePlant(body, res);
    }

    if (body.method === "createPlant") {
        return createPlant(body, res);
    }

    if (body.method === "modifyPlant") {
        return modifyPlant(body, res);
    }
};