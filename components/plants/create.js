import { Form, Input, Button, message, InputNumber } from 'antd';
import themeVariables from '@constants/themeVariables';

export default function CreatePlant({ language, collapsed, ...props }) {



    async function onFinish(values) {
        const { nameEn, nameRu, nameKr, quantity } = values;
        let plant = {
            nameEn: nameEn,
            nameRu: nameRu,
            nameKr: nameKr,
            quantity: quantity
        };
        const res = await fetch('/api', { method: 'POST', body: JSON.stringify({ method: "createPlant", plant: plant }) })
        if (res.status === 200) {
            message.success("Plant successfully created");
            props.onFinish()
        }
    };

    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        errorFields.forEach(item => {
            message.error({ style: { marginLeft: props.collapsed ? themeVariables["@sider-collapsed-width"] : themeVariables["@sider-width"] }, content: item.errors })
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
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="nameRu"
                name="nameRu"
                rules={[{ required: true, message: 'Please input a Russian Value!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="nameKr"
                name="nameKr"
                rules={[{ required: true, message: 'Please input a Korean Value!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please input a quantity' }, { type: "number", message: " Please input a number" }]}
            >
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
            </Button>
            </Form.Item>
        </Form>
    );
};
