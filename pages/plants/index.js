
import { Space, Button, message, Modal, Table, Dropdown, Menu } from "antd"
import useSWR, { mutate } from 'swr';
import CreatePlant from "@components/plants/create"
import ModifyPlant from "@components/plants/modify"
import LocalizedStrings from 'react-localization';


import { useState } from 'react';
import {
    PlusOutlined,
    DownCircleOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';





const fetcher = async () => {
    const res = await fetch('/api', { method: 'POST', body: JSON.stringify({ method: "getPlantList" }) });
    return res.json();
};
export default function Index({ language, collapsed, ...props }) {

    const containerWidth = props.containerRef.current.clientWidth;
    const columns = [
        {
            title: 'nameEn',
            width: 70,
            dataIndex: 'nameEn',
            key: 'nameEn',

        },

        ...(containerWidth > 200 ? [{
            title: 'nameKr',

            dataIndex: 'nameKr',
            key: 'nameKr',

        },
        {
            title: 'nameRu',

            dataIndex: 'nameRu',
            key: 'nameRu',

        }] : []),

        {
            title: <div onClick={() => setCreatePlantVisible(true)}><PlusOutlined /></div>,

            key: 'action',
            render: (text, record, index) => <Dropdown overlay={
                <Menu>
                    <Menu.Item>
                        <Button onClick={() => setModifyPlantVisible(record)}><EditOutlined /></Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button onClick={() => deletePlant(record.id)}><DeleteOutlined /></Button>
                    </Menu.Item>

                </Menu>

            } placement="bottomRight"><DownCircleOutlined /></Dropdown>
        }





    ];
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
            <Table columns={columns} dataSource={plants} pagination={{ size: "small" }} {...(containerWidth > 90 ? { scroll: { x: 150 } } : {})} />

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