import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import * as yup from "yup";
import { loginUser } from '../../api/User';
import userStore from '../../stores/UserStore';
import { ErrorRes } from '../../types/error';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
}).required();
type FormData = yup.InferType<typeof schema>;

export default function LoginLayout() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: FormData) => {
    loginUser(data.email, data.password).then((res) => {
      userStore.setAccessToken(res.data.token.accessToken)
      userStore.setProfile(res)
      localStorage.setItem('accessToken', res.data.token.accessToken);
      localStorage.setItem('user', JSON.stringify(res));
    }).catch((res: ErrorRes) => {
      if (res.response.data.error.message == "Forbidden") {
        toast('Email не подтвержден, потдвердите email');
      } else {
        toast(res.response.data.error.message)
      }
    })
  };
  const forgotPas = () => {
    navigate('/password-recovery')
  }
  const signUp = () => {
    navigate('/signup')
  }

  return (
    <Wrapper>
      <Title>Login</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <WrapperInput>
          <Input {...register("email")} placeholder={'Email'}/>
          <Error>{errors.email?.message}</Error>
        </WrapperInput>
        <WrapperInput>
          <Input {...register("password")} type={'password'} placeholder={'Password'}/>
          <Error>{errors.password?.message}</Error>
        </WrapperInput>
        <Submit type="submit" />
        <Buttons>
          <SignUp onClick={signUp}>Sign Up</SignUp>
          <ForgotPas onClick={forgotPas}>Forgot password?</ForgotPas>
        </Buttons>
        
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

const ForgotPas = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const SignUp = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
