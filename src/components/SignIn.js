import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState } from 'react';

import signInScss from '../styles/signIn.module.scss';
const style = classNames.bind(signInScss);

const SignIn = ({ signInAccountInfo }) => {
    const [accountInfo, setAccountInfo] = useState({ email: "", password: "", rememberChecked: false });

    const onChange = (({ target }) => {
        setAccountInfo((accountInfo) => ({
            ...accountInfo,
            [target.name]: target.value,
        }))
    })

    const onSubmit = (e) => {
        e.preventDefault();
        signInAccountInfo(accountInfo);
    }

    return (
        <div className={style("form-container")}>
            <div className={style("logo")}>
                <h1>ELVIS PRESLEY</h1>
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                        type="email"
                        onChange={onChange}
                        name="email"
                        placeholder="Enter email"
                        value={accountInfo.email}
                    />
                    <Form.Text className={style("left-text") + " text-muted"}>
                        이메일 똑바로 적으라우
                    </Form.Text>
                    <Form.Text className={style("right-text") + " text-muted"}>
                        이메일 찾기
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                        type="password"
                        onChange={onChange}
                        name="password"
                        placeholder="Password"
                    />
                    <Form.Text className={style("left-text") + " text-muted"}>
                        제대로 된 비밀번호 쓰라우
                    </Form.Text>
                    <Form.Text className={style("right-text") + " text-muted"}>
                        비밀번호 찾기
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="remeberCheck">
                    <Form.Check type="checkbox" onChange={onChange} name="rememberChecked" label="Remember me" />
                </Form.Group>
                <Button variant="primary" onClick={onSubmit} className={style("btn")} type="submit">
                    Login
                </Button>
                <Form.Text className={style("sing-Up") + " text-muted"}>
                    <Link to="/signUp">회원가입</Link>
                </Form.Text>
            </Form>
        </div>
    )
}

export default SignIn;