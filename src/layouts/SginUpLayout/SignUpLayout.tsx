import React, { ReactElement } from 'react';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";

import Wrapper from "./styles/Wrapper";
import InputWrapper from "./styles/InputWrapper";
import Input from "./styles/Input";
import styled from 'styled-components';
import { signUpUser } from '../../api/User';
import { observer } from 'mobx-react-lite';
import { ErrorRes } from '../../types/error';

interface FormValues {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface OtherProps {
  title?: string;
}

interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
  initialPhone?: string;
  initialName?: string;
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
      <Title>Sign Up</Title>
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
        <InputWrapper>
          <Input
            width={300}
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Nick Name"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            width={300}
            type="text"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            placeholder="Phone"
          />
        </InputWrapper>
        <LoginButton
          type="submit"
        >
          Sign Up
        </LoginButton>
      </form>
    </Wrapper>
  );
};

const MyForm  = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    email: props.initialEmail || "",
    password: props.initialPassword || "",
    name: props.initialName || "",
    phone: props.initialPhone || ""
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string()
      .required("Name is required"),
    phone: Yup.string()
      .required("Phone is required"),
  }),

  handleSubmit(
    { email, password, name, phone }: FormValues,
    { props, setSubmitting, setErrors }
  ) {
    signUpUser(email, password, phone, name).then((res) => {
        alert("Вы успешно зарегистрировались!")
        window.location.replace("https://gtsk.site")
    }).catch((res: ErrorRes) => {
      console.log(res)
      alert(res.response.data.error.message)
    })
  }
})(InnerForm);

function SignUpLayout(): ReactElement {
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

export default observer(SignUpLayout);
