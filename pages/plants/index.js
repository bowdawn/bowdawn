
import { Space, Button, message, Modal } from "antd"
import useSWR, { mutate } from 'swr';
import CreatePlant from "@components/plants/create"
import ModifyPlant from "@components/plants/modify"
import LocalizedStrings from 'react-localization';


import { useState } from 'react';

const fetcher = async () => {
    const res = await fetch('/api', { method: 'POST', body: JSON.stringify({ method: "getPlantList" }) });
    return res.json();
};
export default function Index({ language, collapsed, ...props }) {
    const [createPlantVisible, setCreatePlantVisible] = useState(false);
    const [modifyPlantVisible, setModifyPlantVisible] = useState(false);
    async function deletePlant(id) {
        const res = await fetch('/api', { method: 'POST', body: JSON.stringify({ method: "deletePlant", plantId: id }) });
        if (res.status === 200) {
            message.success("the plant was deleted");
            mutate('/api');
        }
    };

    const { data, error } = useSWR(`/api`, fetcher);
    if (error) {
        return 'failed to load'
    }
    if (!data) {
        return 'Loading...';
    }

    const { plants } = data;

    const localizedPlants = plants.map((plant =>
        new LocalizedStrings({
            en: {
                name: plant.nameEn
            },
            kr: {
                name: plant.nameKr
            },
            ru: {
                name: plant.nameRu
            }
        })
    ));

    localizedPlants.forEach(plant => {
        plant.setLanguage(language)

    });





    return (
        <div>
            <Space direction="vertical">
                {plants.map((plant, index) => {


                    return <div>
                        <Space>
                            <div>{localizedPlants[index].name}</div>
                            <Button onClick={() => deletePlant(plant.id)}>delete</Button>
                            <Button onClick={() => setModifyPlantVisible(plant)}>modify</Button>
                        </Space>
                    </div>
                })}
                <Button onClick={() => setCreatePlantVisible(true)}>Create</Button>
            </Space>
            <Modal
                title="Enter Plant Info"
                visible={createPlantVisible}
                onCancel={() => setCreatePlantVisible(false)}
                footer={null}
            >
                <CreatePlant onFinish={() => {
                    setCreatePlantVisible(false);
                    mutate('/api');
                }} />
            </Modal>
            <Modal
                title="Modify Plant Info"
                visible={modifyPlantVisible}
                onCancel={() => setModifyPlantVisible(false)}
                footer={null}
                destroyOnClose={true}
            >
                <ModifyPlant plantProps={modifyPlantVisible} onFinish={() => {
                    setModifyPlantVisible(false);
                    mutate('/api');
                }} />
            </Modal>
        </div>
    );
}