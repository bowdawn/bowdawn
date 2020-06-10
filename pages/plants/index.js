
import { Space, Button, message, Modal, Table, Dropdown, Menu } from "antd"
import useSWR, { mutate } from 'swr';
import CreatePlant from "@components/plants/create"
import ModifyPlant from "@components/plants/modify"
import LocalizedStrings from 'react-localization';

import React, { useState, useCallback, useRef } from 'react';

import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';


import {
    PlusOutlined,
    DownCircleOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';



const RNDContext = createDndContext(HTML5Backend);

const type = 'DragableBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: item => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        item: { type, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        />
    );
};



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
    const [data, setData] = useState([])
    const [init, setInit] = useState(false)



    const components = {
        body: {
            row: DragableBodyRow,
        },
    };

    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const dragRow = data[dragIndex];
            setData(
                update(data, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                }),
            );
        },
        [data],
    );

    const manager = useRef(RNDContext);


    const plantData = useSWR(`/api`, fetcher).data;
    const error = useSWR(`/api`, fetcher).error;

    if (error) {
        return 'failed to load'
    }
    if (!plantData) {
        return 'Loading...';
    }

    if (!init) {
        setInit(true)
        setData(plantData.plants)
    }








    return (
        <div>
            <DndProvider manager={manager.current.dragDropManager}>
                <Table
                    columns={columns}
                    dataSource={data}
                    components={components}
                    onRow={(record, index) => ({
                        index,
                        moveRow,
                    })}
                />
            </DndProvider>
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

async function deletePlant(id) {
    const res = await fetch('/api', { method: 'POST', body: JSON.stringify({ method: "deletePlant", plantId: id }) });
    if (res.status === 200) {
        message.success("the plant was deleted");
        mutate('/api');
    }
};