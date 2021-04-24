import React, { Fragment, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import { getOpenKeys, MENU_KEYS, NAV_LEFT } from '../constants/nav-left';

const { Sider } = Layout;
const { SubMenu } = Menu;

const NavLeft = ({ collapsed, setCollapsed, display }) => {
  const [openKeys, setOpenKeys] = useState(getOpenKeys());

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (MENU_KEYS.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  if (!display) {
    return null;
  }
  return (
    <Sider
      style={{
        overflow: 'auto',
        minHeight: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={collapsed => setCollapsed(collapsed)}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={['dashboard']}
      >
        {NAV_LEFT.map(({ key, label, icon: Icon, path = '/', children }) => {
          return (
            <Fragment key={key}>
              {children && children.length > 0 ? (
                <SubMenu key={key} icon={<MailOutlined />} title={label}>
                  {children.map(({ key, label, icon: Icon, path = '/' }) => {
                    return (
                      <Menu.Item key={key} icon={<Icon />}>
                        <Link to={path}>{label}</Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              ) : (
                <Menu.Item icon={<Icon />}>
                  <Link to={path}>{label}</Link>
                </Menu.Item>
              )}
            </Fragment>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default NavLeft;
