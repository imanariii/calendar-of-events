import {Button, Form, Input} from "antd";
import {FC, useState} from "react";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state=>state.auth)
    const {login} = useActions()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        login(username, password)
    }
    return (
        <Form
            onFinish={submit}
        >
            {error &&
                <div style={{color: 'red'}}>
                    {error}
                </div>
            }

            <Form.Item
                label="Логин"
                name="login"
                rules={[{required: true, message: 'Пожалуйста введите ваш логин'}]}
            >
                <Input
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[{required: true, message: 'Пожалуйста введите ваш пароль'}]}
            >
                <Input
                    value={password}
                    type={"password"}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                wrapperCol={{offset: 0, span: 16}}
            >
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;