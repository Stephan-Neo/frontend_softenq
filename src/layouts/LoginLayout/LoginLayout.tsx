import React, { ReactElement } from 'react';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";

import Wrapper from "./styles/Wrapper";
import InputWrapper from "./styles/InputWrapper";
import Input from "./styles/Input";
import styled from 'styled-components';
import { loginUser } from '../../api/User';
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/UserStore';
import { ErrorRes } from '../../types/error';

interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  title?: string;
}

interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = props;

  return (
    <Wrapper>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            width={300}
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            width={300}
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Password"
          />
        </InputWrapper>

        <LoginButton
          type="submit"
        >
          Login
        </LoginButton>
      </form>
    </Wrapper>
  );
};

const MyForm  = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    email: props.initialEmail || "",
    password: props.initialPassword || ""
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required")
  }),

  handleSubmit(
    { email, password }: FormValues,
    { props, setSubmitting, setErrors }
  ) {
    loginUser(email, password).then((res) => {
      userStore.setAccessToken(res.data.token.accessToken)
      userStore.setProfile(res)
      localStorage.setItem('accessToken', res.data.token.accessToken);
      localStorage.setItem('user', JSON.stringify(res));
    }).catch((res: ErrorRes) => {
      console.log(res)
      alert(res.response.data.error.message)
    })
  }
})(InnerForm);

function LoginLayout(): ReactElement {
  return (
      <MyForm />
  )
}

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
`;

const LoginButton = styled.button`
  width: 100%;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px 0;
  
  :disabled{
    background: ${'#deb3b3'};
  }
`;

export default observer(LoginLayout);
