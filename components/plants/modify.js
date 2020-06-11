import { Form, Input, Button, message, InputNumber } from 'antd';
import { number } from "prop-types";


export default function ModifyPlant({ language, collapsed, ...props }) {


    const { id, nameEn, nameKr, nameRu, order, quantity } = props.plantProps;

    async function onFinish(values) {

        const { nameEn, nameRu, nameKr, quantity } = values;
        let plant = {
            id: id,
            order: order,
            nameEn: nameEn,
            nameRu: nameRu,
            nameKr: nameKr,
            quantity: quantity
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
            <Form.Item
                label="quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please input a quantity!' }, { type: "number", message: 'Please input a Number!' }]}
                initialValue={quantity}
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
