import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import * as yup from "yup";
import { signUpUser } from '../../api/User';
import { ErrorRes } from '../../types/error';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  nickname: yup.string().min(3).required(),
  phone: yup.string().min(11).required()
}).required();
type FormData = yup.InferType<typeof schema>;

export default function SignUpLayout() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: FormData) => {
    signUpUser(data.email, data.password, data.phone, data.nickname).then(() => {
      navigate('/')
      toast(`Вы успешно зарегистрировались! Подвердите почту ${data.email} (на нее отправлена ссылка)
         иначе зайти на сервис не получится`)
    }).catch((res: ErrorRes) => {
      toast(res.response.data.error.message)
    })
  };
  const login = () => {
    navigate('/')
  }

  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <WrapperInput>
          <Input {...register("email")} placeholder={'Email'}/>
          <Error>{errors.email?.message}</Error>
        </WrapperInput>
        <WrapperInput>
          <Input {...register("password")} type={'password'} placeholder={'Password'}/>
          <Error>{errors.password?.message}</Error>
        </WrapperInput>
        <WrapperInput>
          <Input {...register("nickname")} placeholder={'Nickname'}/>
          <Error>{errors.nickname?.message}</Error>
        </WrapperInput>
        <WrapperInput>
          <Input {...register("phone")} placeholder={'Phone'}/>
          <Error>{errors.phone?.message}</Error>
        </WrapperInput>
        <Submit type="submit" />
        <Login onClick={login}>Login</Login>
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
  background-color: ${'#303845'};
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
  color: white;
`;

const Error = styled.div`
  width: 100%;
  font-size: 14px;
  color: red;
  margin-top: 5px;
`;

const Login = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 255, 82, 0.6);
  margin-top: 20px;

  :hover {
    cursor: pointer;
  }
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
