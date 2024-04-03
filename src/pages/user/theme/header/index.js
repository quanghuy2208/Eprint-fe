import { memo, useEffect, useRef, useState } from 'react';
import './style.scss';
import { BsHandbag, BsPerson, BsNewspaper, BsBoxSeam } from 'react-icons/bs';
import { ImCalendar, ImProfile } from 'react-icons/im';
import { GrCatalog, GrMenu } from 'react-icons/gr';
import { MdAssistantPhoto } from 'react-icons/md';
import { PiSelectionBackgroundBold } from 'react-icons/pi';
import { FaRegPaperPlane } from 'react-icons/fa6';
import { GiTicket, GiPostStamp } from 'react-icons/gi';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { FaArrowRight } from 'react-icons/fa';
import { GoTriangleDown } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../../../utils/router';
import { images } from '../../../../img/index';
import { Popover } from 'antd';
import * as UserService from '../../../../services/UserService';
import { searchProduct } from '../../../../redux/slices/productSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = event => {
      // Kiểm tra xem có click bên ngoài phần tử menu không
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Nếu không, đặt isShowCategories về false
        setShowCategories(false);
      }
    };

    // Thêm sự kiện click toàn cục
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Loại bỏ sự kiện khi component unmount
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [isShowCategories, setShowCategories] = useState(false);
  const [search, setSearch] = useState('');
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
              path: '/logo',
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
              name: 'Brochure/Tờ gấp',
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
              name: 'Thiệp mời/Thư cảm ơn',
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
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await UserService.logoutUser();
    localStorage.removeItem('user');
    setUser(null);
  };
  const handleNavigatetype = typeSlug => {
    navigate(`/Product-type/${typeSlug}`, { state: typeSlug });
  };
  const content = (
    <div>
      <p
        style={{ cursor: 'pointer' }}
        onMouseEnter={e => {
          e.target.style.color = '#e00202';
        }}
        onMouseLeave={e => {
          e.target.style.color = 'black';
        }}>
        Hồ sơ
      </p>
      {user?.isAdmin && (
        <p
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/system/admin');
          }}
          onMouseEnter={e => {
            e.target.style.color = '#e00202';
          }}
          onMouseLeave={e => {
            e.target.style.color = 'black';
          }}>
          Quản lý hệ thống
        </p>
      )}
      <p
        style={{ cursor: 'pointer' }}
        onClick={handleLogout}
        onMouseEnter={e => {
          e.target.style.color = '#e00202';
        }}
        onMouseLeave={e => {
          e.target.style.color = 'black';
        }}>
        Đăng xuất
      </p>
    </div>
  );
  const onSearch = e => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  return (
    <div>
      <div className="grid wide header__top">
        <div className="row container">
          <Link to={'/'} className="col l-3 logo-align">
            <img src={images.logo} alt="" />
          </Link>
          <div className="col l-6 search">
            <form action="#" className="row">
              <div className="group">
                <input type="text" placeholder="Nhập từ khóa cần tìm" onChange={onSearch}></input>
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
              <div className="header__top-align">
                <li>
                  <BsPerson className="header__top-icon" />
                </li>
                {user?.name ? (
                  <Popover content={content} trigger="click">
                    <div className="user-detail">{user.name}</div>
                  </Popover>
                ) : (
                  <Link to={'/login'} className="text">
                    Đăng nhập
                  </Link>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid ">
        <div className="row navbar">
          <div className="col l-3 navbar__item">
            <div className="header__menu__category" onClick={() => setShowCategories(!isShowCategories)} ref={menuRef}>
              <GrMenu />
              SẢN PHẨM IN ẤN
            </div>
            {isShowCategories && (
              <div className="header__menu__category-align">
                <ul className={isShowCategories ? 'header__menu__category-list' : 'hidden'}>
                  <li className="header__menu__category-item">
                    <ImCalendar />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'lich-tet';
                        handleNavigatetype(typeSlug);
                      }}>
                      Lịch
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <GrCatalog />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'catalogue';
                        handleNavigatetype(typeSlug);
                      }}>
                      Catalogue
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <ImProfile />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'profile';
                        handleNavigatetype(typeSlug);
                      }}>
                      Profile
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <BsNewspaper />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'brochure';
                        handleNavigatetype(typeSlug);
                      }}>
                      Brochure/Tờ gấp
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <BsBoxSeam />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'hop';
                        handleNavigatetype(typeSlug);
                      }}>
                      Hộp
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <MdAssistantPhoto />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'standee';
                        handleNavigatetype(typeSlug);
                      }}>
                      Standee
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <PiSelectionBackgroundBold />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'backdrop';
                        handleNavigatetype(typeSlug);
                      }}>
                      Backdrop
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <FaRegPaperPlane />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'to-roi';
                        handleNavigatetype(typeSlug);
                      }}>
                      Tờ rơi
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <GiTicket />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'voucher';
                        handleNavigatetype(typeSlug);
                      }}>
                      Voucher
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <RiEmojiStickerLine />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'sticker';
                        handleNavigatetype(typeSlug);
                      }}>
                      Sticker
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <GiPostStamp />
                    <div
                      className="header__menu__category-link"
                      onClick={() => {
                        const typeSlug = 'tem-nhan';
                        handleNavigatetype(typeSlug);
                      }}>
                      Tem nhãn
                    </div>
                  </li>
                  <li className="header__menu__category-item">
                    <Link to={'/category'} className="header__menu__category-all">
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
                          <li key={`${menuKey}-${childKey}`} className="header__menu__dropdown-item">
                            <Link to={childItem.path} className="header__menu__dropdown-link">
                              {childItem.name}
                            </Link>
                            {childItem.children && (
                              <ul className="header__menu__dropdown__sub">
                                {childItem.children.map((childrenItem, childrenKey) => (
                                  <li key={`${menuKey}-${childrenKey}`} className="header__menu__dropdown__sub-item">
                                    <Link to={childrenItem.path} className="header__menu__dropdown__sub-link">
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
            <Link to={'/order'}>
              <img src={images.Print} className="print" alt=""></img>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Header);
