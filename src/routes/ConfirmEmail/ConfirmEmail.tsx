import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmEmail } from '../../api/User';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

function ConfirmEmail(): ReactElement {
  let query = useQuery();
  let hash = query.get("hash") || ""
  const navigate = useNavigate();

  useEffect(() => {
    confirmEmail(hash).then((res) => {
      if (res.data) {
        alert("Email confirm. Please Login")
        navigate('/')
      }
    }).catch(() => {
      alert("Ссылка истекла или не правильная. Отправьте повторный запрос на подверждение почты")
      navigate('/')
    })
  })
  return (
    <Wrapper>
      Confirmed email
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

export default ConfirmEmail;
