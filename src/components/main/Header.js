import classNames from 'classnames/bind';

import headerStyle from '../../styles/main/header.module.scss';
const style = classNames.bind(headerStyle);

const Header = () => {


    return (
        <div className={style('nav-container')}>
            <div className={style('item-container')}>
                <div className={style("logo-container")}>
                    <img className={style("logo-img")} alt="logo" src="../img/logo.png" />
                </div>
                <div className={style('user-info-container')}>
                    {/* 아이콘 대체 필요 */}
                    <div className={style('small-info')}>
                        <span>알림 <span>5</span></span>
                    </div>
                    <div className={style('small-info')}>
                        <span>팔로잉 <span>5</span></span>
                    </div>
                    <div className={style('small-info')}>
                        <span>팔로우 <span>5</span></span>
                    </div>
                    <div>
                        <span>마이페이지</span>   
                    </div>
                    <div>
                        <span>햄버거버튼</span>
                    </div>
                </div>
            </div>
            <div className={style('message-container')}>
                <span className={style('mouse-message')}>마우스 올리셈</span>
            </div>
        </div>
    )
}

export default Header;