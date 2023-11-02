import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import * as yup from "yup";
import { ErrorRes } from '../../types/error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePassword } from '../../api/User';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = yup.object({
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().label('confirm password').required().oneOf([yup.ref('password'), ''], 'Passwords must match'),
}).required();
type FormData = yup.InferType<typeof schema>;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export default function UpdatePassword() {
  let query = useQuery();
  let hash = query.get("hash") || ""
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: FormData) => {
    updatePassword(hash, data.password).then((res) => {
      toast(`Ваш пароль обновлен, попробуйти заново войти!`)
      reset()
      setTimeout(() => {navigate('/')}, 4000)
    }).catch((res: ErrorRes) => {
      toast(res.response.data.error.message);
    })
  };

  return (
    <Wrapper>
      <Title>Update Password</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <WrapperInput>
          <Input {...register("password")} type={'password'} placeholder={'Password'}/>
          <Error>{errors.password?.message}</Error>
        </WrapperInput>
        <WrapperInput>
          <Input {...register("confirmPassword")} type={'password'} placeholder={'Confirm Password'}/>
          <Error>{errors.confirmPassword?.message}</Error>
        </WrapperInput>
        <Submit type="submit" />
      </form>
      <ToastContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #191970, #7B68EE);
`;

const WrapperInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 40px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
`;

const Error = styled.div`
  width: 100%;
  font-size: 14px;
  color: red;
  margin-top: 5px;
`;

const Input = styled.input`
  width: 300px;
  max-width: 500px;
  height: 50px;
  background-color: rgba(246, 246, 246, 0.3);
  border: 1px solid #d8dde6;
  color: white;
  border-radius: 5px;
  text-indent: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;

  ::-webkit-input-placeholder {
    opacity: 0.4;
    font-size: inherit;
    color: inherit;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover {
    border: 1px solid #a3afc4;
  }

  &:focus {
    border: 1px solid #d8dde6;
    background-color: rgba(246, 246, 246, 0.2);
  }

  :focus::-webkit-input-placeholder {
    opacity: 0;
    transform: translateX(10px);
  }
`;

const Submit = styled.input`
  width: 300px;
  max-width: 500px;
  height: 50px;
  margin-bottom: 20px;
  background-color: rgb(236, 236, 236);
  border: 1px solid #d8dde6;
  text-indent: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;

  ::-webkit-input-placeholder {
    opacity: 0.4;
    font-size: inherit;
    color: inherit;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover {
    border: 1px solid #a3afc4;
  }

  &:focus {
    border: 1px solid #d8dde6;
    background-color: rgba(246, 246, 246, 0.2);
  }

  :focus::-webkit-input-placeholder {
    opacity: 0;
    transform: translateX(10px);
  }
`;
