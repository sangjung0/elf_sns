import {Button, Form, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState } from 'react';

import singUpScss from '../styles/singUp.module.scss';
const style = classNames.bind(singUpScss);

const SingUp = ({registerAccountInfo}) => {
    const [accountInfo, setAccountInfo] = useState({email:"", password: "", name: "", phoneNumber:""});

    const onChange = (({target}) =>{
        switch(target.name){
            case "email":
                setAccountInfo({...accountInfo, email: target.value})
                break;
            case "password":
                setAccountInfo({...accountInfo, password: target.value})
                break;
            case "name":
                setAccountInfo({...accountInfo, name: target.value})
                break;
            case "phoneNumber":
                setAccountInfo({...accountInfo, phoneNumber: target.value})
                break;
            default:
                break;
        }
    })
    const onSubmit = (e) => {
        e.preventDefault();
        registerAccountInfo(accountInfo);        
    }

    return(
        <div className={style("form-container")}>
            <div className={style("logo")}>
                <h1>ELVIS PRESLEY</h1>
            </div>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="email">
                    <Form.Control type="email" name="email" onChange={onChange} placeholder="Email" required/>
                </Form.Group>
            
                <Form.Group as={Row} className="mb-3" controlId="password">
                    <Form.Control type="password" name="password" onChange={onChange} placeholder="Password" required/>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="name">
                    <Form.Control type="text" name="name" onChange={onChange} placeholder="Name" required/>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="phoneNumber">
                <Form.Control
                    type="tel"
                    placeholder="010-1234-5678"
                    onChange={onChange}
                    name="phoneNumber" 
                    required
                />
                </Form.Group>
                <Form.Group as={Row} className={"mb-3"}>
                    <Col md={8} className={style("col")}>
                        <Button type="submit" onClick={onSubmit} className={style("btn")}>Sign up</Button>
                    </Col>
                    <Col md={4} className={style("col")}>
                    <Form.Text className={style("sing-Up")+" text-muted"}>
                        <Link to="/signIn" >로그인</Link>
                    </Form.Text>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SingUp;