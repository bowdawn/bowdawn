
import { Space, Button, message, Modal } from "antd"
import useSWR, { mutate } from 'swr';
import CreatePlant from "@components/plants/create"

import { useState } from 'react';

const fetcher = async () => {
    const res = await fetch('/api', { method: 'POST', body: JSON.stringify({ method: "getPlantList" }) });
    return res.json();
};
export default function Index({ language, collapsed, ...props }) {

    const [createPlantVisible, setCreatePlantVisible] = useState(false);
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



    return (
        <div>

            <Space direction="vertical">

                {plants.map((plant) => {
                    switch (language) {
                        case "en":
                            return <div>
                                <Space>
                                    <div>{plant.nameEn}</div>
                                    <Button onClick={() => deletePlant(plant.id)}>delete</Button>
                                </Space>
                            </div>
                        case "ru":
                            return <div><Space><div>{plant.nameRu}</div> <Button onClick={() => deletePlant(plant.id)}>удалить</Button></Space></div>
                        case "kr":
                            return <div><Space><div>{plant.nameKr}</div> <Button onClick={() => deletePlant(plant.id)}>삭제</Button></Space></div>
                        default:
                            return "default"
                    }
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
        </div>
    );
}