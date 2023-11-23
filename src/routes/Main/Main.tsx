import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { listTransactions } from '../../api/Tron';
import tronStore from '../../stores/TronStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import {Spin} from 'antd';


function Main(): ReactElement {
  const navigate = useNavigate();
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const infoCheck = (hash: string) => {
    navigate(`/transaction?hash=${hash}`)
  };
  const endTimestamp: number = Date.now();
  const twentyFourHoursInMilliseconds: number = 24 * 60 * 60 * 1000;
  const startTimestamp: number = endTimestamp - twentyFourHoursInMilliseconds;

  const personalInfoCheck = (address: string) => {
    navigate(`/personalTransaction?address=${address}`)
  }
  useEffect(() => {
    setSpinning(true);
    listTransactions(true, 20, 0, startTimestamp, endTimestamp).
    then((res) => {
      setSpinning(false);
      tronStore.setTransactions(res)
      console.log(tronStore.transactions?.data[0].toAddress)
    })
  }, [])
  return (
    <Wrapper>
      <>
        <Spin spinning={spinning} fullscreen />
        <>
        <Title>Transactions</Title>
        <TitleColumn>
          <div>From</div>
          <div>Amount</div>
          <div>To</div>
        </TitleColumn>
        {tronStore.transactions?.data.map((tran) => {
          return (
            <WrapperTransactions>
              <OwnerAddress onClick={() => {personalInfoCheck(tran.ownerAddress)}}>
                {tran.ownerAddress}
              </OwnerAddress>
              <Amount onClick={() => {infoCheck(tran.hash)}}>
                {tran.amount}
              </Amount>
              <ToAdress onClick={() => {personalInfoCheck(tran.toAddress)}}>
                {tran.toAddress}
              </ToAdress>
            </WrapperTransactions>
          )
        })}
        </>
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

const TitleColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;

  div {
    width: 33%;
    text-align: center;
    font-size: 30px
  }
`;

const WrapperTransactions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ToAdress = styled.div`
  font-size: 16px;
  font-weight: 800;
  width: 40%;
  text-align: center;
  
  :hover {
    cursor: pointer;
    color: rgb(69, 86, 184);
  }
`;

const OwnerAddress = styled.div`
  font-size: 16px;
  font-weight: 800;
  width: 40%;
  text-align: center;

  :hover {
    cursor: pointer;
    color: rgb(69, 86, 184);
  }
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: 800;
  width: 20%;
  text-align: center;
  
  :hover {
    cursor: pointer;
    color: rgb(69, 86, 184);
  }
`;


export default observer(Main);
