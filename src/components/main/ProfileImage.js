import classNames from 'classnames/bind';

import profileImageStyle from '../../styles/main/profileImage.module.scss';
const style = classNames.bind(profileImageStyle);

const ProfileImage = ({src}) => {
    return(
        <>
            <div className={style('box')}>
                <div className={style('img-container')}>
                    <img className={style('profile-img')} src={src} alt={src} />
                </div>
            </div>
        </>
    )
}

export default ProfileImage;