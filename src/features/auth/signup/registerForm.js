import React from 'react';
import {connect} from 'react-redux'
import { Form, Segment, Button, Label,Divider } from 'semantic-ui-react';
import { Field,reduxForm} from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {signup} from '../authActions'
import {combineValidators,isRequired} from 'revalidate'
import  SocialLogin from '../socailLogin/socialLogin'

const validate =combineValidators({
    displayName:isRequired('Name is Required '),
    email:isRequired('email is Required '),
    password:isRequired('password is Required '),
})

const RegisterForm = ({handleSubmit,signup,error}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(signup)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && <Label basic color='red'>{error}</Label>}
          <Button fluid size="large" color="teal">
            Register
          </Button>
          <Divider horizontal>
         or
        </Divider>
        <SocialLogin/>
        </Segment>
      </Form>
    </div>
  );
};

const actions ={signup}

export default connect(null,actions)(reduxForm({form: 'registerForm'},validate)(RegisterForm));