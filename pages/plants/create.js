import { Form, Input, Button, message } from 'antd';
import themeVariables from '@constants/themeVariables';

export default function CreatePlant({ language, collapsed, ...props }) {



    async function onFinish(values) {
        const { nameEn, nameRu, nameKr } = values;
        let plant = {
            nameEn: nameEn,
            nameRu: nameRu,
            nameKr: nameKr
        };
        const res = await fetch('/api/plants/create', { method: 'POST', body: JSON.stringify(plant) })
        if (res.status === 200) {
            message.success("this is a success message");

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

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
            </Button>
            </Form.Item>
        </Form>
    );
};
