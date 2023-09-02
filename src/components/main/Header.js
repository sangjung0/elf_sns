import classNames from 'classnames/bind';
import { BsBell } from 'react-icons/bs';
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsPencil } from "react-icons/bs";
import {CgProfile} from "react-icons/cg";
import { memo, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { OverlayTrigger, Popover, ListGroup, Button, Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import headerStyle from '../../styles/main/header.module.scss';
const style = classNames.bind(headerStyle);

const Header = ({ onClickHamburger, onClickWrite }) => {
    const [allam, setAllam] = useState([])
    const navigate = useNavigate();

    const onRemove = (e) => {
        e.preventDefault()
        setAllam(allam.filter(i => i !== e.target.classList[0] + " " + e.target.classList[1]))
    }

    const onClickMypage = () => {
        navigate('/mypage');
    }
    const onClickMain = () => {
        navigate('/post');
    }

    useEffect(() => {
        // setTimeout(() => toast("Wow so easy !"), 3000)
        const recieveAllam = setInterval(() => {
            const message = `message ${allam.length + 1}`
            toast(message)
            if (allam.length < 10)
                setAllam(allam.concat(message))
            else
                setAllam(allam.splice(1, allam.length).concat(message))
        }, 50000)

        return () => clearInterval(recieveAllam)
    }, [allam]);

    const popoverBottom = (
        <Popover
            id="popover-positioned-bottom"
            title="Popover bottom"
        >
            <Popover.Header>
                Allam List
            </Popover.Header>
            <Popover.Body>
                <ListGroup>
                    {
                        allam.map((a, idx) => (
                            <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                                {a}&nbsp;&nbsp;
                                <Button
                                    type="submit"
                                    className={a}
                                    variant="outline-danger"
                                    size='sm'
                                    onClick={onRemove}
                                >
                                    X
                                </Button>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose="5000"
                pauseOnHover="false"
                pauseOnFocusLoss="false"
            />
            <div className={style('nav-container')}>
                <div className={style('item-container')}>
                    <div className={style("logo-container")}>
                        <img className={style("logo-img")} onClick={onClickMain} alt="logo" src="../img/logo.png" />
                    </div>
                    <div className={style('user-info-container')}>
                        <div className={style('small-info')}>
                            <OverlayTrigger trigger="click" placement='bottom' overlay={popoverBottom}>
                                <span><BsBell /> <span className={style('text')}>{allam.length}</span></span>
                            </OverlayTrigger>
                        </div>
                        {/* <div className={style('small-info')}>
                            <span><SlUserFollowing /> <span className={style('text')}>5</span></span>
                        </div>
                        <div className={style('small-info')}>
                            <span><SlUserFollow /> <span className={style('text')}>5</span></span>
                        </div>
                        <div>
                            <span className={style('text')}>마이페이지</span>
                        </div> */}
                        <div>
                            <sapn onClick={onClickWrite}><BsPencil /> write</sapn>
                        </div>
                        <div>
                            <sapn onClick={onClickMypage}><CgProfile /></sapn>
                        </div>
                        <div>
                            <span onClick={onClickHamburger}><GiHamburgerMenu /></span>
                        </div>
                    </div>
                </div>
                {/* <div className={style('message-container')}>
                    <span className={style('mouse-message')}>마우스 올리셈</span>
                </div> */}
            </div>
        </>
        // <Navbar fixed="top" className="bg-secondary mb-3" >
        //     <Container>
        //         <img width="75" alt="logo" src="../img/logo.png" />
        //         <Nav>
        //             <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
        //                 <span>
        //                     <BsBell />
        //                     <span >{allam.length}</span>
        //                 </span>
        //             </OverlayTrigger>

        //             <div onClick={onClickHamburger}>
        //                 <GiHamburgerMenu />
        //             </div>
        //         </Nav>
        //     </Container>
        // </Navbar>
    )
}

export default memo(Header);