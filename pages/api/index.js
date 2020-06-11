
import createPlant from "@lib/plants/create"
import deletePlant from "@lib/plants/delete"
import modifyPlant from "@lib/plants/modify"
import fetchPlant from "@lib/plants/fetch"
export default (req, res) => {
    const body = JSON.parse(req.body);
    if (body.method === "getPlantList") {
        return fetchPlant(body, res)
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