import classNames from 'classnames/bind';
import { BsBell } from 'react-icons/bs';
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl';
import { GiHamburgerMenu } from 'react-icons/gi';
import { memo } from 'react';

import { OverlayTrigger, Popover, ListGroup, Button } from 'react-bootstrap';

import headerStyle from '../../styles/main/header.module.scss';
const style = classNames.bind(headerStyle);

const Header = ({ onClickHamburger, allam, setAllam }) => {

    const popoverBottom = (
        <Popover
            id="popover-positioned-bottom"
            title="Popover bottom"
            placement="right"
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
                                    onClick={setAllam}
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
        <div className={style('nav-container')}>
            <div className={style('item-container')}>
                <div className={style("logo-container")}>
                    <img className={style("logo-img")} alt="logo" src="../img/logo.png" />
                </div>
                <div className={style('user-info-container')}>
                    <div className={style('small-info')}>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
                            <span><BsBell /> <span className={style('text')}>{allam.length}</span></span>
                        </OverlayTrigger>
                    </div>
                    <div className={style('small-info')}>
                        <span><SlUserFollowing /> <span className={style('text')}>5</span></span>
                    </div>
                    <div className={style('small-info')}>
                        <span><SlUserFollow /> <span className={style('text')}>5</span></span>
                    </div>
                    <div>
                        <span className={style('text')}>마이페이지</span>
                    </div>
                    <div>
                        <span onClick={onClickHamburger}><GiHamburgerMenu /></span>
                    </div>
                </div>
            </div>
            <div className={style('message-container')}>
                <span className={style('mouse-message')}>마우스 올리셈</span>
            </div>
        </div>
    )
}

export default memo(Header);