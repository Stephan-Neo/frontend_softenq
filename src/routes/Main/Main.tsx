import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { listTransactions } from '../../api/Tron';
import tronStore from '../../stores/TronStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';


function Main(): ReactElement {
  const navigate = useNavigate();
  const infoCheck = (hash: string) => {
    navigate(`/transaction?hash=${hash}`)
  };
  useEffect(() => {
    listTransactions(true, 20, 0, 1529856000000, 1680503191391).
    then((res) => {
      tronStore.setTransactions(res)
      console.log(tronStore.transactions?.data[0].toAddress)
    })
  }, [])
  return (
    <Wrapper>
      <>
        <Title>Transactions</Title>
        {tronStore.transactions?.data.map((tran) => {
          return (
            <WrapperTransactions onClick={() => {infoCheck(tran.hash)}}>
              <OwnerAddress>
                {tran.ownerAddress}
              </OwnerAddress>
              <Amount>
                {tran.amount}
              </Amount>
              <ToAdress>
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

const WrapperTransactions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
  
  :hover {
    background: #706868;
  }
`;

const ToAdress = styled.div`
  font-size: 16px;
  font-weight: 800;
`;

const OwnerAddress = styled.div`
  font-size: 16px;
  font-weight: 800;
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: 800;
`;


export default observer(Main);
