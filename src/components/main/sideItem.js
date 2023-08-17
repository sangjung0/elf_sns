import classNames from 'classnames/bind';

import sideItemStyle from '../../styles/main/sideItem.module.scss';
const style = classNames.bind(sideItemStyle);

const SideBlock = () => {

    return (
        <div className={style('sideitem-container')}>
            <div className={style('allam')}>
                {/* 종모양 이모티콘 */}
                <span>알</span>
            </div>
            <div className={style('user-card')}>
                <div className={style('img-container')}>
                    <img className={style('profile-img')} src="../img/test_img/사람_1.jpg" alt="userId_123" />
                </div>
                <div className={style('user-info')}>
                    <div className={style('user-name')}>
                        <span>유저 이름</span>
                    </div>
                    <div className={style('user-settings')}>
                        <span>언팔</span>
                        <span>차단</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBlock;