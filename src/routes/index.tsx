import React, { ReactElement, useEffect } from 'react';
import { Route, Routes as CRoutes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import Main from './Main';
import NotFound from '../components/NotFound';
import LoginLayout from '../layouts/LoginLayout/LoginLayout';
import { observer } from 'mobx-react-lite';
import userStore from '../stores/UserStore';
import Profile from './Profile';

function Routes(): ReactElement {
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    userStore.setAccessToken(token || '')
    userStore.setProfile(user || '')
  }, [])
  return (
    <CRoutes>
      {
        userStore.accessToken ?
      <Route path="/" element={<MainLayout />}>
        <Route path="/main" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      :
      <Route path="/" element={<LoginLayout />}></Route>
      }
    </CRoutes>
  );
}

export default observer(Routes);
