import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/UserStore';
import { getWallet } from '../../api/wallet';
import tronStore from '../../stores/TronStore';

function Profile(): ReactElement {
  const user = userStore.profile
  const userId = userStore.profile?.data.profile.id
  useEffect(() => {
    getWallet(userId!).then((res) => {
      tronStore.setAddress(res.data.address)
    })
  }, [])
  return (
    <Wrapper>
        <Title>Profile</Title>
        <Info>Имя: <InfoText>{user?.data.profile.name}</InfoText></Info>
        <Info>Email: <InfoText>{user?.data.profile.email}</InfoText></Info>
        <Info>Подверждение email: <InfoText>{user?.data.profile.confirmEmail ? "Подтвержден" : "Не подтвержден"}</InfoText></Info>
        <Info>Адрес кошелька: <InfoText>{tronStore?.address ? tronStore.address : "Кошелёк не подключен"}</InfoText></Info>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 50px;
  padding: 30px;
  font-weight: 800;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 800;
  margin-bottom: 30px;

  @media(max-width: 800px) {
    font-size: 30px;
  }
`;

const Info = styled.div`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;

  @media(max-width: 800px) {
    font-size: 16px;
  }
`;

const InfoText = styled.div`
  font-size: 20px;
  color: #219ebc;
  margin-left: 30px;

  @media(max-width: 800px) {
    margin-left: 10px;
    font-size: 18px;
    overflow: clip;
  }
`;

export default observer(Profile);
