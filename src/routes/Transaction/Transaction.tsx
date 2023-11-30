import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { infoTransaction } from '../../api/Tron';
import tronStore from '../../stores/TronStore';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import {Spin} from 'antd';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

function Transaction(): ReactElement {
  const [spinning, setSpinning] = React.useState<boolean>(false);
  let query = useQuery();
  let hash = query.get("hash") || ""
  useEffect(() => {
    setSpinning(true);
    infoTransaction(hash).
    then((res) => {
      setSpinning(false);
      tronStore.setTransaction(res)
      console.log(res)
    })
  }, [])
  return (
    <Wrapper>
      <>
        <Spin spinning={spinning} fullscreen />
        <Title>Info transaction</Title>
        <Info>Hash: <InfoText>{tronStore.transaction?.hash}</InfoText></Info>
        <Info>Block: <InfoText>{tronStore.transaction?.block}</InfoText></Info>
        <Info>Confirmed: <InfoText>{tronStore.transaction?.confirmed ? "Confirmed": "Not confirmed"}</InfoText></Info>
        <Info>Fee: <InfoText>{tronStore.transaction?.cost.fee}</InfoText></Info>
      </>
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
  color: #219ebc;
  margin-left: 30px;
`;

export default observer(Transaction);
