import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { transactionPersonalList } from '../../api/Tron';
import tronStore from '../../stores/TronStore';
import { observer } from 'mobx-react-lite';
import {Spin} from 'antd';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

function MyTransaction(): ReactElement {
  let query = useQuery();
  const [spinning, setSpinning] = React.useState<boolean>(false);
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
    })
  }, [])
  return (
    <Wrapper>
      <>
        <Spin spinning={spinning} fullscreen />
        <Title>My Transactions</Title>
        {!tronStore.transactionPersonalList?.data ? () => {
          <AddressInfo>Address: <InfoText>{address}</InfoText></AddressInfo>
          {tronStore.transactionPersonalList?.data.map((tran) => {
            return (
            <WrapperInfo>
            <Info>From: <InfoText>{tran.from}</InfoText></Info>
            <Info>Amount: <InfoText>{tran.amount}</InfoText></Info>
            <Info>To: <InfoText>{tran.to}</InfoText></Info>
            </WrapperInfo>
            )
          })}
        } :
          <Info>Пока у вас нет транзакций</Info>
        }
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

const AddressInfo = styled.div`
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
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
  color: #219ebc;
  margin-left: 30px;
`;

export default observer(MyTransaction);