import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/UserStore';

function Profile(): ReactElement {
  const user = userStore.profile
  return (
    <Wrapper>
        <Title>Profile</Title>
        <Info>Имя: <InfoText>{user?.data.profile.name}</InfoText></Info>
        <Info>Email: <InfoText>{user?.data.profile.email}</InfoText></Info>
        <Info>Подверждение email: <InfoText>{user?.data.profile.confirmEmail ? "Подтвержден" : "Не подтвержден"}</InfoText></Info>
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
`;

const Info = styled.div`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const InfoText = styled.div`
  font-size: 20px;
  color: #5270b8;
  margin-left: 30px;
`;

export default observer(Profile);
