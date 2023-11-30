import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { listTransactions } from '../../api/Tron';
import tronStore from '../../stores/TronStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Chart from "react-apexcharts";
import {Spin} from 'antd';
import { ReloadOutlined } from '@ant-design/icons';


function Main(): ReactElement {
  const navigate = useNavigate();
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const [update, setUpdate] = React.useState<boolean>(true);
  const [ownwerAdsress, setOwnerAddress] = React.useState<any>([])
  const [amount, setAmount] = React.useState<any>([])
  const infoCheck = (hash: string) => {
    navigate(`/transaction?hash=${hash}`)
  };
  const endTimestamp: number = Date.now();
  const twentyFourHoursInMilliseconds: number = 24 * 60 * 60 * 1000;
  const startTimestamp: number = endTimestamp - twentyFourHoursInMilliseconds;
  const options = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ownwerAdsress
      }
    },
    series: [
      {
        name: "series-1",
        data: amount
      }
    ]
  }

  const personalInfoCheck = (address: string) => {
    navigate(`/personalTransaction?address=${address}`)
  }
  useEffect(() => {
    setSpinning(true);
    listTransactions(true, 20, 0, startTimestamp, endTimestamp).
    then((res) => {
      setSpinning(false);
      tronStore.setTransactions(res)
      if (Array.isArray(res.data) && res.data.length > 0) {
        setOwnerAddress(res.data.map(tron => tron.ownerAddress));
        setAmount(res.data.map(tron => tron.amount));
      }
      setUpdate(false)
    })
  }, [update])
  return (
    <Wrapper>
      <>
        <Spin spinning={spinning} fullscreen />
        <WrapperTitle>
          <Title>Transactions</Title>
          <UpdateButton onClick={() => setUpdate(true)}>
            <ReloadOutlined />
          </UpdateButton>
        </WrapperTitle>
        <Chart
          options={options.options}
          series={options.series}
          type="bar"
          width="700"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          />
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

const WrapperTitle = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UpdateButton = styled.button`
  width: 50px;
  height: 50px;
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
  margin-bottom: 10px;
  border-bottom: 1px solid #b6b6b69d;
`;

const ToAdress = styled.div`
  font-size: 16px;
  font-weight: 800;
  width: 40%;
  text-align: center;
  margin-bottom: 10px;
  
  :hover {
    cursor: pointer;
    color: #219ebc;
  }
`;

const OwnerAddress = styled.div`
  font-size: 16px;
  font-weight: 800;
  width: 40%;
  text-align: center;

  :hover {
    cursor: pointer;
    color: #219ebc;
  }
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: 800;
  width: 20%;
  text-align: center;
  
  :hover {
    cursor: pointer;
    color: #219ebc;
  }
`;


export default observer(Main);
