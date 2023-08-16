import classNames from 'classnames/bind';
import layoutScss from '../styles/layout.module.scss';
const style = classNames.bind(layoutScss);

const Layout = ({children}) => {
    return(
        <div className={style('container')}>
            <div className={style('left')}>
                <div className={style("logo-Container")}>
                        <img className={style("logo-Img")} alt="logo" src="img/logo.png" />
                </div>
            </div>
            <div className={style('right')}>
                {children}
            </div>
        </div>
    )
}

export default Layout;