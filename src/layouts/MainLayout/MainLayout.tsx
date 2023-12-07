import React, { useEffect, useState } from 'react';
import  { useNavigate  } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Link, NavLink, Outlet } from 'react-router-dom';
import appStore from '../../stores/AppStore';
import userStore from '../../stores/UserStore';
import tronStore from '../../stores/TronStore';
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';


const MainLayout = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [burgerMenuVisible, setBurgerMenuVisible] = useState(false);
  const address = tronStore.address;
  const { t } = useTranslation();
  let navigate = useNavigate();
  const routeChange = () => {
    navigate('/');
  };
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  const toggleBurgerMenu = () => {
    setBurgerMenuVisible(!burgerMenuVisible);
  };
  const closeBurgerMenu = () => {
    setBurgerMenuVisible(false);
  };
  return (
    <Wrapper isDark={appStore.isDark}>
      <Header isDark={appStore.isDark}>
        <div>
          <Link to="/main">
            <LogoHeader src="/icon.svg" alt="" />
          </Link>
        </div>
        {windowWidth <= 800 ? (
          <>
            <MenuOutlined onClick={toggleBurgerMenu} style={{ fontSize: '24px', cursor: 'pointer' }} />
            <Drawer
              title="Menu"
              placement="right"
              closable={false}
              onClose={toggleBurgerMenu}
              visible={burgerMenuVisible}
            >
              <BurgerMenu closeMenu={closeBurgerMenu}/>
            </Drawer>
          </>
        ) : (
          <Navigate>
            <HeaderLink to="profile">Profile</HeaderLink>
            <HeaderLink to={`myTransaction?address=${address}`}>
              My transactions
            </HeaderLink>
            <HeaderLink to="wallet">Wallet</HeaderLink>
            <ChangeTheme
              isDark={appStore.isDark}
              onClick={() =>
                appStore.isDark
                  ? appStore.setTheme(false)
                  : appStore.setTheme(true)
              }
            />
            <LogOut
              onClick={() => {
                localStorage.clear();
                userStore.setAccessToken('');
                routeChange();
              }}
            />
          </Navigate>
        )}
      </Header>
      <Content isDark={appStore.isDark}>
        <Outlet />
      </Content>
      <Footer isDark={appStore.isDark}>
        <LogoFooter src="/icon.svg" alt="" />
        <div>
          <p>{t('byGTSK')}</p>
        </div>
      </Footer>
    </Wrapper>
  );
};

// @ts-ignore
const BurgerMenu = ({ closeMenu }) => {
  const address = tronStore.address;
  let navigate = useNavigate();
  const routeChange = () => {
    navigate('/');
  };
  return (
    <>
      <BurgerMenuItem onClick={() => { navigate('profile'); closeMenu(); }}>Profile</BurgerMenuItem>
      <BurgerMenuItem onClick={() => { navigate(`myTransaction?address=${address}`); closeMenu(); }}>
        My transactions
      </BurgerMenuItem>
      <BurgerMenuItem onClick={() => { navigate('wallet'); closeMenu(); }}>Wallet</BurgerMenuItem>
      <BurgerMenuItem
        onClick={() => {
          appStore.isDark ? appStore.setTheme(false) : appStore.setTheme(true);
          closeMenu();
        }}
      >
        Change Theme
      </BurgerMenuItem>
      <BurgerMenuItem
        onClick={() => {
          localStorage.clear();
          userStore.setAccessToken('');
          routeChange();
        }}
      >
        Log Out
      </BurgerMenuItem>
    </>
  );
};

const BurgerMenuItem = styled.div`
  margin: 15px;
  cursor: pointer;
`;

const Wrapper = styled.div<{ isDark: boolean }>`
  width: 100%;
  min-height: 100%;
  background-color: ${({ isDark }) => (isDark ? '#023047' : '#ffffff')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div<{ isDark: boolean }>`
  padding: 20px 30px;
  background-color: ${({ isDark }) => (isDark ? '#219ebc' : '#219ebc')};
  font-size: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media(min-width: 800px) {
    padding: 10px 10px;
  }
`;

const Content = styled.div<{ isDark: boolean }>`
  min-height: 100ch;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ isDark }) => (isDark ? '#ffb703' : '#000000')};
`;

const HeaderLink = styled(NavLink)`
  font-size: 25px;
  margin-right: 25px;
  text-transform: uppercase;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover{
    color: white;
  }
`;

const LogoHeader = styled.img`
  width: 50px;

  @media(min-height: 800px) {
    width: 30px;
  }
`;

const Navigate = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChangeTheme = styled.div<{ isDark: boolean }>`
  display: flex;
  margin-left: 15px;
  flex-direction: row;
  width: 40px;
  height: 40px;
  background: url(${({ isDark }) => 
      isDark
        ? './sun.ico'
        : './moon.ico'})
    100% 5% / cover no-repeat;
  :hover {
    cursor: pointer;
  }
`;

const LogOut = styled.div`
  display: flex;
  margin-left: 40px;
  flex-direction: row;
  width: 40px;
  height: 40px;
  background: url(${'./logout.ico'}) 50% / cover;
  :hover {
    cursor: pointer;
  }
`;

const LogoFooter = styled.img`
  width: 50px;
`;

const Footer = styled.div<{ isDark: boolean }>`
  background-color: ${({ isDark }) => (isDark ? '#219ebc' : '#219ebc')};
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;

  div {
    text-align: right;
  }

  p {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
    color: white;
  }
`;

export default observer(MainLayout);