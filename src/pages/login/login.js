import React from "react";
import './login.css'

import { Form, Icon, Input, Button, message } from 'antd';
import Axios from 'axios';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.redirect = this.redirect.bind(this);
    }
    redirect() {
        this.props.history.replace('/');
    }
    render() {
        return (
            <div className="page-container">
                <div className="login-wrapper">
                    <div className="brand-img-wrapper">
                        <img src="https://us.123rf.com/450wm/nickg76/nickg761606/nickg76160600221/59770075-l%C3%ADneas-geom%C3%A9tricas-y-puntos-patr%C3%B3n-de-l%C3%ADnea-fondo-del-cubo-moderno-abstracci%C3%B3n-de-la-c%C3%A9lula-ilustraci%C3%B3n-de-la-conexi%C3%B3n-p.jpg?ver=6" alt=""/>
                    </div>
                    <div className="form-wrapper">
                        <div className="form-title-wrapper">
                            <header>登录</header>
                        </div>
                        <div>
                            <LoginForm redirect={this.redirect}/>
                        </div>
                    </div>
                </div>
                <div className="copy-right">Power By AaronW ♥ {new Date().getFullYear()}</div>
            </div>
        );
    }
}

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    componentDidMount() {
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Axios.post("/auth", values).then(res => {
                    message.success("登录成功");
                    let token = res.data.data.token;
                    window.sessionStorage.setItem('token', token);

                    this.props.redirect();
                }).catch(err => {
                    console.log(err);
                    message.error("登录失败");
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return <Form onSubmit={this.handleSubmit}>
            <Form.Item>
                {
                    getFieldDecorator("username", {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user"/>} placeholder="用户名"/>
                    )
                }
            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="user"/>} type={"password"} placeholder="密码"/>
                    )
                }
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">登录</Button>
            </Form.Item>
        </Form>
    }
}

LoginForm = Form.create({"name": "login"})(LoginForm)

export default Login;