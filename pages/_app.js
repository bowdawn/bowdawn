import { Fragment } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';


import '../assets/self-styles.less';
import "./app.less";

import { Layout, Menu, Space, Typography, Tag } from 'antd';




import Icon, {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faPalette, faMugHot } from '@fortawesome/free-solid-svg-icons'

const { Header, Sider, Content } = Layout;
const AntLink = Typography.Link;


const nav1 = { en: "plants", ru: "растения", kr: "식물" }
const nav2 = { en: "paintings", ru: "картинки", kr: "그림" }
const nav3 = { en: "tea", ru: "чай", kr: "차" }


export default class NextApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }



  state = {
    collapsed: false,
    language: "en"
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  toggleLanguage = (language) => {
    this.setState({ language });
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <Fragment >
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <title>bowdawn</title>
          <link rel='shortcut icon' href='/seedling-solid.svg' type='image/svg' />

        </Head>



        <Layout >
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ height: "100vh" }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

              <Menu.Item key="1" icon={<Icon component={() => <FontAwesomeIcon icon={faSeedling} />} />} >
                <Link href="/secret">
                  {nav1[this.state.language]}
                </Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<Icon component={() => <FontAwesomeIcon icon={faPalette} />} />} >
                <Link href="/paintings">
                  {nav2[this.state.language]}
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<Icon component={() => <FontAwesomeIcon icon={faMugHot} />} />} >
                <Link href="/tea">
                  {nav3[this.state.language]}
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
              <Space style={{ paddingRight: 24 }}>
                <AntLink onClick={() => this.toggleLanguage("en")}>
                  <Tag color="green">
                    Eng
                  </Tag>
                </AntLink>
                <AntLink onClick={() => this.toggleLanguage("ru")}>
                  <Tag color="green">
                    Рус
                  </Tag>
                </AntLink>
                <AntLink onClick={() => this.toggleLanguage("kr")}>
                  <Tag color="green">
                    한
                  </Tag>
                </AntLink>
              </Space>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: 24,
                padding: 24,
                minHeight: 280,
              }}
            >
              <Container>
                <Component {...pageProps} router={router} />
              </Container>
            </Content>
          </Layout>
        </Layout>
      </Fragment>
    );


  }


}



