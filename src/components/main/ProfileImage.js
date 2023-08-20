import classNames from 'classnames/bind';

import profileImageStyle from '../../styles/main/profileImage.module.scss';
const style = classNames.bind(profileImageStyle);

const ProfileImage = () => {
    return(
        <>
            <div className={style('box')}>
                <div className={style('img-container')}>
                    <img className={style('profile-img')} src="../img/test_img/사람_1.jpg" alt="userId_123" />
                </div>
            </div>
        </>
    )
}

export default ProfileImage;