

import { Fragment, useState, useEffect } from 'react';

import App from 'next/app';
import Head from 'next/head';
import '@assets/self-styles.less';
import "./app.less";
import { Layout, Menu, Space, Typography, Tag, ConfigProvider, message, Dropdown, Modal, Button } from 'antd';
import Icon, {
  MenuUnfoldOutlined,
  MenuFoldOutlined,

  SettingOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faPalette, faMugHot, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import themeVariables from '@constants/themeVariables';
import { AuthProvider } from "../middleware/auth.js"
import LocalizedStrings from 'react-localization';
import Login from "@components/Login"
import Register from "@components/Register"
import app from "@lib/base.js";

const { Header, Sider, Content } = Layout;
const { CheckableTag } = Tag;

const label = new LocalizedStrings({
  en: {
    plants: "plants",
    paintings: "paintings",
    tea: "tea",
    register: "register",
    login: "login",
    logout: "logout"
  },
  ru: {
    plants: "растения",
    paintings: "картинки",
    tea: "чай",
    register: "зарегистрироваться",
    login: "войти",
    logout: "выйти"
  },
  kr: {
    plants: "식물",
    paintings: "그림",
    tea: "차",
    register: "회원가입",
    login: "로그인",
    logout: "로그아웃"
  }
});

const getSiderLayout = () => {
  return ([
    {
      label: label.plants,
      link: "/plants",
      icon: faSeedling
    },
    {
      label: label.paintings,
      link: "/paintings",
      icon: faPalette
    },
    {
      label: label.tea,
      link: "/tea",
      icon: faMugHot
    },
  ])
};

function NextApp({ Component, pageProps, router }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
    });
  }, []);
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  let siderLayout = getSiderLayout();
  const [language, setLanguage] = useState('en');
  const toggleLanguage = (language) => {
    label.setLanguage(language);
    setLanguage(language);
    siderLayout = getSiderLayout();
  }
  message.config({ top: 90 });
  const settingsClick = (key) => {
    switch (key) {
      case "logout":
        app.auth().signOut();
        message.success("Logout Success")
        break;
      case "login":
        setLoginVisible(true);
        break;
      case "register":
        setRegisterVisible(true);
        break;
      case "en":
        toggleLanguage("en");
        break;
      case "ru":
        toggleLanguage("ru");
        break;
      case "kr":
        toggleLanguage("kr");
        break;
      default:
    }
  };

  const menu = (
    <Menu placement="bottomRight" style={{ marginRight: "24px" }} onClick={({ item, key, keyPath, domEvent }) => settingsClick(key)}>
      {(currentUser ?
        [<Menu.Item key="logout">{label.logout}</Menu.Item>] :
        [<Menu.Item key="login">{label.login}</Menu.Item>,
        <Menu.Item key="register">{label.register}</Menu.Item>]
      ).map((item) => item)}
      <Menu.Item key="en">
        <CheckableTag checked={language === "en"} className={language === "en" ? "" : "ant-tag-green"}>
          Eng
        </CheckableTag>
      </Menu.Item>
      <Menu.Item key="ru">
        <CheckableTag checked={language === "ru"} className={language === "ru" ? "" : "ant-tag-green"}>
          Рус
        </CheckableTag>
      </Menu.Item>
      <Menu.Item key="kr">
        <CheckableTag checked={language === "kr"} className={language === "kr" ? "" : "ant-tag-green"}>
          한
        </CheckableTag>
      </Menu.Item>
    </Menu>
  );
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
                {[...Array(collapsed ? 3 : 6)].map((e, i) => <FontAwesomeIcon icon={faSeedling} color={themeVariables["@color-primary"]} key={"icon" + i} />)}
              </div>
            </Link>
            <Menu theme="dark" mode="inline" selectedKeys={[router.pathname]}>
              {siderLayout.map((item) =>
                <Menu.Item key={item.link} icon={<Icon component={() => <FontAwesomeIcon icon={item.icon} />} />} >
                  <Link href={item.link}>
                    <a>
                      {item.label}
                    </a>
                  </Link>
                </Menu.Item>)
              }
            </Menu>
          </Sider>
          <Layout className="site-layout" >
            <Header className="site-layout-background" style={{ padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ paddingRight: 24, display: "flex", alignItems: "center" }}>
                  <SettingOutlined style={{ fontSize: 25 }} />
                </a>
              </Dropdown>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: 24,
                padding: 24,
                minHeight: 280,
              }}>
              <AuthProvider>
                <Component {...pageProps} collapsed={collapsed} language={language} router={router} />
              </AuthProvider>
            </Content>
          </Layout>
        </Layout>
        <Modal
          visible={loginVisible}
          onCancel={() => setLoginVisible(false)}
          footer={null}
        >
          <Login onFinish={() => setLoginVisible(false)} />
        </Modal>
        <Modal
          visible={registerVisible}
          onCancel={() => setRegisterVisible(false)}
          footer={null}
        >
          <Register onFinish={() => setRegisterVisible(false)} />
        </Modal>
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
