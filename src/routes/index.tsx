import React, { ReactElement, useEffect } from 'react';
import { Route, Routes as CRoutes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import Main from './Main';
import NotFound from '../components/NotFound';
import { LoginLayout } from '../layouts/LoginLayout';
import { SignUpLayout } from '../layouts/SignUpLayout';
import { observer } from 'mobx-react-lite';
import userStore from '../stores/UserStore';
import Profile from './Profile';
import ConfirmEmail from './ConfirmEmail';
import PasswordRecovery from './PasswordRecovery';
import UpdatePassword from './UpdatePassword';
import Transaction from './Transaction';

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
        <Route path="/transaction" element={<Transaction />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      :
          <Route>
            <Route path='/' element={<LoginLayout />} />
            <Route path='/signup' element={<SignUpLayout />} />
            <Route path='/confirm-email' element={<ConfirmEmail />} />
            <Route path='/password-recovery' element={<PasswordRecovery />} />
            <Route path='/update-password' element={<UpdatePassword />} />
          </Route>
      }
    </CRoutes>
  );
}

export default observer(Routes);
