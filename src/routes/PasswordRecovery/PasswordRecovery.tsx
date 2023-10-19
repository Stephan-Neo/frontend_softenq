import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import * as yup from "yup";
import { ErrorRes } from '../../types/error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { passwordRecovery } from '../../api/User';

const schema = yup.object({
  email: yup.string().email().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

export default function PasswordRecovery() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: FormData) => {
    passwordRecovery(data.email).then((res) => {
      toast(`На почту ${data.email} отправлена ссылка на восстановление пароля`)
      reset()
    }).catch((res: ErrorRes) => {
      toast(res.response.data.error.message);
    })
  };

  return (
    <Wrapper>
      <Title>Password Recovery</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <WrapperInput>
          <Input {...register("email")} placeholder={'Email'}/>
          <Error>{errors.email?.message}</Error>
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
