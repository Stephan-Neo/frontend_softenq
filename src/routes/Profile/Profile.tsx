import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/UserStore';

function Profile(): ReactElement {
  const user = userStore.profile
  return (
    <Wrapper>
      <div>
        Имя: {user?.data.profile.name}
      </div>
      <br/>
      <div>
        Номер: {user?.data.profile.phone}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 50px;
  padding: 30px;
  font-weight: 800;
`;

export default observer(Profile);
