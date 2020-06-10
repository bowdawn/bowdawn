import { Form, Input, Button, message } from 'antd';
import themeVariables from '@constants/themeVariables';

export default function ModifyPlant({ language, collapsed, ...props }) {


    const { id, nameEn, nameKr, nameRu, order } = props.plantProps;

    async function onFinish(values) {

        const { nameEn, nameRu, nameKr } = values;
        let plant = {
            id: id,
            order: order,
            nameEn: nameEn,
            nameRu: nameRu,
            nameKr: nameKr
        };

        const res = await fetch('/api', { method: 'POST', body: JSON.stringify({ method: "modifyPlant", plant: plant }) })
        if (res.status === 200) {
            message.success("Plant successfully modified");
            props.onFinish()
        }
    };

    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        errorFields.forEach(item => {
            message.error(item.errors)
        });
    }
    return (
        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="nameEn"
                name="nameEn"
                rules={[{ required: true, message: 'Please input an English Value' }]}
                initialValue={nameEn}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="nameRu"
                name="nameRu"
                rules={[{ required: true, message: 'Please input a Russian Value!' }]}
                initialValue={nameRu}

            >
                <Input />
            </Form.Item>
            <Form.Item
                label="nameKr"
                name="nameKr"
                rules={[{ required: true, message: 'Please input a Korean Value!' }]}
                initialValue={nameKr}
            >
                <Input />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
            </Button>
            </Form.Item>
        </Form>
    );
};
