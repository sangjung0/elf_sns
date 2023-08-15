import {Button, Form} from 'react-bootstrap';
import classNames from 'classnames/bind';

import signInScss from '../styles/signIn.scss';
const style = classNames.bind(signInScss);

const SignIn = () => {
    return(
        <div className={style("form-container")}>
            <div className={style("logo")}>
                <h1>ELVIS PRESLEY</h1>
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        이메일 똑바로 적으라우
                    </Form.Text>
                    <Form.Text className="text-muted right-text">
                        이메일 찾기
                    </Form.Text>
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                        제대로 된 비밀번호 쓰라우
                    </Form.Text>
                    <Form.Text className="text-muted right-text">
                        비밀번호 찾기
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Form.Text className="text-muted sing-Up">
                    회원가입
                </Form.Text>
            </Form>
        </div>
    )
}

export default SignIn;