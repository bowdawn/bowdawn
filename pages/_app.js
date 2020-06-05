

import { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from 'next/app';
import Head from 'next/head';
import '@assets/self-styles.less';
import "./app.less";
import { Layout, Menu, Space, Typography, Tag, ConfigProvider, message } from 'antd';
import Icon, {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faPalette, faMugHot } from '@fortawesome/free-solid-svg-icons';
import themeVariables from '@constants/themeVariables';

import { AuthProvider } from "../middleware/auth.js"


const { Header, Sider, Content } = Layout;
const { CheckableTag } = Tag;
const AntLink = Typography.Link;




const siderLayout = [
  {
    label: {
      en: "plants", ru: "растения", kr: "식물"
    },
    link: "/plants",
    icon: faSeedling
  },
  {
    label: {
      en: "paintings", ru: "картинки", kr: "그림"
    },
    link: "/paintings",
    icon: faPalette
  },
  {
    label:
      { en: "tea", ru: "чай", kr: "차" },
    link: "/tea",
    icon: faMugHot
  }
];





export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

function NextApp({ Component, pageProps, router }) {

  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const [language, setLanguage] = useState('en');
  const toggleLanguage = (language) => {
    setLanguage(language);
  }

  message.config({ top: 90 });

  return (
    <Fragment >
      <ConfigProvider>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <title>bowdawn</title>
          <link rel='shortcut icon' href='/seedling-solid.svg' type='image/svg' />

        </Head>
        <Layout >
          <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: "100vh" }} collapsedWidth={themeVariables["@sider-collapsed-width"]} width={themeVariables["@sider-width"]} >

            <Link href="/">
              <div className="logo">
                {[...Array(collapsed ? 3 : 6)].map((e, i) => <FontAwesomeIcon icon={faSeedling} color={themeVariables["@color-primary"]} key={i} />)}
              </div>
            </Link>
            <Menu theme="dark" mode="inline" selectedKeys={[router.pathname]}>
              {siderLayout.map((item) => <Menu.Item key={item.link} icon={<Icon component={() => <FontAwesomeIcon icon={item.icon} />} />} >
                <Link href={item.link}>
                  <a>
                    {item.label[language]}
                  </a>
                </Link>
              </Menu.Item>)}
            </Menu>
          </Sider>
          <Layout className="site-layout" >
            <Header className="site-layout-background" style={{ padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
              <Space style={{ paddingRight: 24 }}>
                <AntLink onClick={() => toggleLanguage("en")} >
                  <CheckableTag checked={language === "en"} className={language === "en" ? "" : "ant-tag-green"}>
                    Eng
                </CheckableTag>
                </AntLink>
                <AntLink onClick={() => toggleLanguage("ru")}>
                  <CheckableTag checked={language === "ru"} className={language === "ru" ? "" : "ant-tag-green"}>
                    Рус
                </CheckableTag>
                </AntLink>
                <AntLink onClick={() => toggleLanguage("kr")}>
                  <CheckableTag checked={language === "kr"} className={language === "kr" ? "" : "ant-tag-green"}>
                    한
                </CheckableTag>
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
              < AuthProvider >
                <Component {...pageProps} collapsed={collapsed} language={language} router={router} />
              </AuthProvider>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </Fragment >
  );

}


NextApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default NextApp
