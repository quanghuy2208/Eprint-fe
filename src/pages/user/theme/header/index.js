import { memo, useState } from 'react';
import './style.scss';
import { BsHandbag } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import { ImCalendar } from 'react-icons/im';
import { GrCatalog } from 'react-icons/gr';
import { ImProfile } from 'react-icons/im';
import { BsNewspaper } from 'react-icons/bs';
import { BsBoxSeam } from 'react-icons/bs';
import { MdAssistantPhoto } from 'react-icons/md';
import { PiSelectionBackgroundBold } from 'react-icons/pi';
import { FaRegPaperPlane } from 'react-icons/fa6';
import { GiTicket } from 'react-icons/gi';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { GiPostStamp } from 'react-icons/gi';
import { FaArrowRight } from 'react-icons/fa';
import { GrMenu } from 'react-icons/gr';
import { GoTriangleDown } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { ROUTERS } from '../../../../utils/router';
import { images } from '../../../../img/index';

const Header = () => {
    const [menus] = useState([
        {
            name: 'Về Eprint',
            path: '',
            isShowSubmenu: false,
            child: [
                {
                    name: 'Giới thiệu',
                    path: ROUTERS.USER.ABOUT.PATH,
                },
                {
                    name: 'Tuyển dụng',
                    path: ROUTERS.USER.ABOUT.RECRUIT.PATH,
                },
            ],
        },
        {
            name: 'Thiết kế',
            path: ROUTERS.USER.DESIGN.PATH,
            isShowSubmenu: false,
            child: [
                {
                    name: 'Thiết kế thương hiệu',
                    path: '',
                    isShowSubmenu: false,
                    children: [
                        {
                            name: 'Logo',
                            path: 'design/logo',
                        },
                        {
                            name: 'Catalogue',
                            path: '',
                        },
                        {
                            name: 'Profile',
                            path: '',
                        },
                        {
                            name: 'Brochure',
                            path: '',
                        },
                        {
                            name: 'Bao bì',
                            path: '',
                        },
                        {
                            name: 'Hộp quà',
                            path: '',
                        },
                        {
                            name: 'Standee',
                            path: '',
                        },
                        {
                            name: 'Backdrop',
                            path: '',
                        },
                        {
                            name: 'Tờ rơi',
                            path: '',
                        },
                        {
                            name: 'Thiệp mời',
                            path: '',
                        },
                        {
                            name: 'Voucher',
                            path: '',
                        },
                        {
                            name: 'Sticker',
                            path: '',
                        },
                        {
                            name: 'Tem nhãn',
                            path: '',
                        },
                        {
                            name: 'Túi',
                            path: '',
                        },
                        {
                            name: 'Card visit',
                            path: '',
                        },
                        {
                            name: 'Menu',
                            path: '',
                        },
                        {
                            name: 'Lì xì',
                            path: '',
                        },
                    ],
                },
                {
                    name: 'Gói thiết kế',
                    path: '',
                    isShowSubmenu: false,
                    children: [
                        {
                            name: 'Nhận diện thương hiệu cốt lõi',
                            path: '',
                        },
                        {
                            name: 'Nhận diện sản phẩm',
                            path: '',
                        },
                        {
                            name: 'Nhận diện văn phòng',
                            path: '',
                        },
                        {
                            name: 'Nhận diện ngoài trời',
                            path: '',
                        },
                        {
                            name: 'Ấn phẩm truyền thông',
                            path: '',
                        },
                        {
                            name: 'Ấn phẩm sự kiện',
                            path: '',
                        },
                    ],
                },
            ],
        },
        {
            name: 'Dự án',
            path: ROUTERS.USER.PROJECT,
        },
        {
            name: 'Tài nguyên',
            path: ROUTERS.USER.SOURCE,
        },
        {
            name: 'Chính sách',
            path: ROUTERS.USER.POLICY,
        },
    ]);
    const [isShowCategories, setShowCategories] = useState(false);
    return (
        <div>
            <div className="grid wide header__top">
                <div className="row container">
                    <div className="col l-3 logo-align">
                        <img src={images.logo} alt="" />
                    </div>
                    <div className="col l-6 search">
                        <form action="#" className="row">
                            <div className="group">
                                <input type="text" placeholder="Nhập từ khóa cần tìm"></input>
                                <button type="submit" className="button-submit">
                                    Tìm kiếm
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col l-3 header__top-right">
                        <ul>
                            <li>
                                <BsHandbag className="header__top-icon" />
                                <span>0</span>
                            </li>
                            <div>
                                <li>
                                    <BsPerson className="header__top-icon" />
                                </li>

                                <li className="text">Đăng nhập</li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid ">
                <div className="row navbar">
                    <div className="col l-3 navbar__item">
                        <div className="header__menu__category" onClick={() => setShowCategories(!isShowCategories)}>
                            <GrMenu />
                            SẢN PHẨM IN ẤN
                        </div>
                        {isShowCategories && (
                            <div className="header__menu__category-align">
                                <ul className={isShowCategories ? 'header__menu__category-list' : 'hidden'}>
                                    <li className="header__menu__category-item">
                                        <ImCalendar />
                                        <Link to={''} className="header__menu__category-link">
                                            Lịch
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <GrCatalog />
                                        <Link to={''} className="header__menu__category-link">
                                            Catalogue
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <ImProfile />
                                        <Link to={''} className="header__menu__category-link">
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <BsNewspaper />
                                        <Link to={''} className="header__menu__category-link">
                                            Brochure/Tờ gấp
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <BsBoxSeam />
                                        <Link to={''} className="header__menu__category-link">
                                            Hộp
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <MdAssistantPhoto />
                                        <Link to={''} className="header__menu__category-link">
                                            Standee
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <PiSelectionBackgroundBold />
                                        <Link to={''} className="header__menu__category-link">
                                            Backdrop
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <FaRegPaperPlane />
                                        <Link to={''} className="header__menu__category-link">
                                            Tờ rơi
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <GiTicket />
                                        <Link to={''} className="header__menu__category-link">
                                            Voucher
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <RiEmojiStickerLine />
                                        <Link to={''} className="header__menu__category-link">
                                            Sticker
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <GiPostStamp />
                                        <Link to={''} className="header__menu__category-link">
                                            Tem nhãn
                                        </Link>
                                    </li>
                                    <li className="header__menu__category-item">
                                        <Link to={'category'} className="header__menu__category-all">
                                            XEM TẤT CẢ
                                            <FaArrowRight />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="col l-6 navbar__item">
                        <nav className="header__menu">
                            <ul className="header__menu-list">
                                {menus?.map((menu, menuKey) => (
                                    <li key={menuKey} className="header__menu-item">
                                        <Link to={menu?.path} className="header__menu-link">
                                            {menu?.name}
                                        </Link>
                                        <GoTriangleDown />
                                        {menu.child && (
                                            <ul className="header__menu__dropdown">
                                                {menu.child.map((childItem, childKey) => (
                                                    <li
                                                        key={`${menuKey}-${childKey}`}
                                                        className="header__menu__dropdown-item"
                                                    >
                                                        <Link
                                                            to={childItem.path}
                                                            className="header__menu__dropdown-link"
                                                        >
                                                            {childItem.name}
                                                        </Link>
                                                        {childItem.children && (
                                                            <ul className="header__menu__dropdown__sub">
                                                                {childItem.children.map((childrenItem, childrenKey) => (
                                                                    <li
                                                                        key={`${menuKey}-${childrenKey}`}
                                                                        className="header__menu__dropdown__sub-item"
                                                                    >
                                                                        <Link
                                                                            to={childrenItem.path}
                                                                            className="header__menu__dropdown__sub-link"
                                                                        >
                                                                            {childrenItem.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="col l-3">
                        <Link to = {'order'}><img src={images.Print} className="print" alt=""></img></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default memo(Header);
