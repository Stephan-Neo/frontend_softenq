import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { transactionPersonalList } from '../../api/Tron';
import tronStore from '../../stores/TronStore';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import {Spin} from 'antd';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

function TransactionPersonalList(): ReactElement {
  const [spinning, setSpinning] = React.useState<boolean>(false);
  let query = useQuery();
  let address = query.get("address") || ""
  const endTimestamp: number = Date.now();
  const twentyFourHoursInMilliseconds: number = 24 * 60 * 60 * 1000;
  const startTimestamp: number = endTimestamp - twentyFourHoursInMilliseconds;
  useEffect(() => {
    setSpinning(true);
    transactionPersonalList(address, startTimestamp, endTimestamp).
    then((res) => {
      setSpinning(false);
      tronStore.setTransactionPersonalList(res)
      console.log(res)
      console.log(tronStore.transactionPersonalList?.data[0].from)
    })
  }, [])
  return (
    <Wrapper>
      <>
        <Spin spinning={spinning} fullscreen />
        <Title>Current users info transaction</Title>
        {tronStore.transactionPersonalList?.data.map((tran) => {
          return (
            <WrapperInfo>
              <Info>Address: <InfoText>{address}</InfoText></Info>
              <Info>From: <InfoText>{tran.from}</InfoText></Info>
              <Info>Amount: <InfoText>{tran.amount}</InfoText></Info>
              <Info>To: <InfoText>{tran.to}</InfoText></Info>
            </WrapperInfo>
          )
        })}
        
        <></>
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

const WrapperInfo = styled.div`
  margin-bottom: 50px;
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

export default observer(TransactionPersonalList);