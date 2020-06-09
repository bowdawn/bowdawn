import { Form, Input, Button, Row, Col, message } from 'antd';
import themeVariables from '@constants/themeVariables';
import app from "@lib/base"

export default function Login(props) {
    const onFinish = async values => {
        const { email, password } = values;
        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email, password);
            message.success('Login Success');
            props.onFinish();

        } catch (error) {
            message.error(error.toString());
        }
    };

    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        errorFields.forEach(item => {
            message.error({ style: { marginLeft: props.collapsed ? themeVariables["@sider-collapsed-width"] : themeVariables["@sider-width"] }, content: item.errors })
        });
    }

    return (
        <Row style={{ height: "100%" }} justify="center" align="middle">
            <Col>
                <Form

                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        labelCol={{ span: 24 }}
                        name="email"
                        rules={[{
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        labelCol={{ span: 24 }}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item >
                        <Row justify="center">
                            <Col>
                                <Button type="primary" htmlType="submit">
                                    Submit
        </Button></Col></Row>
                    </Form.Item>
                </Form>
            </Col> </Row>
    );
};