import React from 'react'
import {Menu, Button} from 'semantic-ui-react';

const SignoutMenu = ({sign,register}) => {
  return (
    <Menu.Item position="right">
    <Button basic inverted content="Login" onClick={sign}/>
    <Button basic inverted content="Sign Up" style={{marginLeft: '0.5em'}} onClick={register} />
    </Menu.Item>
  )
}

export default SignoutMenu
