import classNames from 'classnames/bind';
import { BsBell } from 'react-icons/bs';
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl';
import {GiHamburgerMenu} from 'react-icons/gi';
import { memo } from 'react';

import headerStyle from '../../styles/main/header.module.scss';
const style = classNames.bind(headerStyle);

const Header = ({onClickHamburger}) => {


    return (
        <div className={style('nav-container')}>
            <div className={style('item-container')}>
                <div className={style("logo-container")}>
                    <img className={style("logo-img")} alt="logo" src="../img/logo.png" />
                </div>
                <div className={style('user-info-container')}>
                    <div className={style('small-info')}>
                        <span><BsBell/> <span className={style('text')}>5</span></span>
                    </div>
                    <div className={style('small-info')}>
                        <span><SlUserFollowing/> <span className={style('text')}>5</span></span>
                    </div>
                    <div className={style('small-info')}>
                        <span><SlUserFollow/> <span className={style('text')}>5</span></span>
                    </div>
                    <div>
                        <span className={style('text')}>마이페이지</span>   
                    </div>
                    <div>
                        <span onClick={onClickHamburger}><GiHamburgerMenu/></span>
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