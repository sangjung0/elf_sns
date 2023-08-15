import classNames from 'classnames/bind';
import layoutScss from '../styles/layout.scss';
const style = classNames.bind(layoutScss);

const Layout = ({children}) => {
    return(
        <div className={style('container')}>
            <div className={style('left')}>
                <div className="logo-Container">
                        <img className="logo-Img" alt="logo" src="img/logo.png" />
                </div>
            </div>
            <div className={style('right')}>
                {children}
            </div>
        </div>
    )
}

export default Layout;