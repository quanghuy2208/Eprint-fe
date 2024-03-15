import { memo, useState } from 'react';
import { designImg, images } from '../../../img/index';
import { FaRegEye } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { BsDownload } from 'react-icons/bs';
import { CiCircleRemove } from 'react-icons/ci';
import { CiClock2 } from 'react-icons/ci';
import { CiSearch } from 'react-icons/ci';
import { BsHandbag } from 'react-icons/bs';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.scss';

const DetailPage = () => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    return (
        <>
            <div className="grid product-detail_background">
                <div className="grid wide product-detail_body">
                    <div className="row ">
                        <div className="col l-9">
                            <div className="row product-detail_align">
                                <div className="col l-3">
                                    <div className="product-detail_image">
                                        <img src={images.product} alt="" className="product-detail_img" />
                                        <ul>
                                            <li>
                                                <FaRegEye />
                                                18.000
                                            </li>
                                            <li>
                                                <CiHeart />
                                                18.000
                                            </li>
                                            <li>
                                                <BsDownload />
                                                Tải về
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col l-6 product-detail_info">
                                    <h2>
                                        In lịch bloc siêu đại <br /> Việt Nam thịnh vượng mã B123
                                    </h2>
                                    <ul className="product-detail_info-list">
                                        <li>
                                            <span>Quy cách:</span> N/A
                                        </li>
                                        <li>
                                            <span>Chất liệu: </span> Đang cập nhập
                                        </li>
                                        <li>
                                            <span>Kỹ thuật in:</span> Tùy chỉnh theo yêu cầu
                                        </li>
                                        <li>
                                            <span>Gia công:</span> Đang cập nhập
                                        </li>
                                        <li>
                                            <span>Bản quyền:</span> EPrint
                                        </li>
                                    </ul>
                                    <div className="row">
                                        <div className="col product-detail_checkbox">
                                            <label>
                                                <input type="checkbox" /> <span>Thiết kế + In ấn</span>
                                            </label>
                                        </div>
                                        <div className="col product-detail_checkbox">
                                            <label>
                                                <input type="checkbox" /> <span>Thiết kế</span>
                                            </label>
                                        </div>
                                    </div>
                                    <button className="product-detail_btn">
                                        <span className="text">ĐẶT HÀNG NGAY</span>
                                    </button>
                                </div>
                            </div>
                            <div className="row product-detail_dscr">
                                <div className="col">
                                    <div className="suggest-header__box">
                                        <h1>Chi tiết sản phẩm</h1>
                                    </div>
                                    <h2>Mô tả Lịch Bloc</h2>
                                    <p>
                                        Đứng trước sự phát triển mạnh mẽ và chóng mặt của các thiết bị xem thời gian
                                        hiện đại, lịch bloc truyền thống vẫn luôn nhận được sự yêu thích và ưu tiên lựa
                                        chọn làm quà biếu tặng ngày tết của người tiêu dùng. Nếu như bạn đang tìm sản
                                        phẩm cho doanh nghiệp của mình, hãy tham khảo ngay lịch bloc siêu đại Cây
                                        thuốc sức khỏe LB-AH23-11 mà Printgo sẽ bật mí ngay bài viết dưới đây.
                                    </p>
                                    <span>Quy cách in ấn và gia công lịch bloc</span>
                                    <table border="1">
                                        <tbody>
                                            <tr>
                                                <td className="table_title">Kích thước</td>
                                                <td className="table_dscr">Tùy chỉnh theo yêu cầu khách hàng</td>
                                            </tr>
                                            <tr>
                                                <td className="table_title">Chất lượng</td>
                                                <td className="table_dscr">Giấy Couche Matt 57 gsm</td>
                                            </tr>
                                            <tr>
                                                <td className="table_title">Loại lịch</td>
                                                <td className="table_dscr">Lịch bloc siêu đại</td>
                                            </tr>
                                            <tr>
                                                <td className="table_title">Bộ bao gồm</td>
                                                <td className="table_dscr">
                                                    Hộp - Áo block - Bìa treo - Túi giấy Duplex
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table_title">Phụ kiện</td>
                                                <td className="table_dscr">Nẹp thông minh - Ốc đầu tròn</td>
                                            </tr>
                                            <tr>
                                                <td className="table_title">Phương pháp in</td>
                                                <td className="table_dscr"> In offset 4 màu</td>
                                            </tr>
                                            <tr>
                                                <td className="table_title">Gia công</td>
                                                <td className="table_dscr">
                                                    <ul>
                                                        <li>Áo bloc in Metalize cao cấp</li>
                                                        <li>
                                                            Bìa treo metalize hologram 7 màu, thúc nổi 3D. Trên bìa gắn
                                                            chữ Lộc cẩm thạch
                                                        </li>
                                                        <li>Hộp in Metalize hologram 7 màu, ép nổi 3D, ép vân</li>
                                                        <li>Túi giấy cán màng</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table_title">Số lượng in</td>
                                                <td className="table_dscr"> Từ 800 cuốn trở lên</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <span>Chi tiết chất liệu và gia công lịch bloc: </span>

                                    <div className="grid wide wide-product-detail_slider">
                                        <Carousel responsive={responsive} className="product-detail_slider">
                                            <div
                                                className="product-detail_slider-item"
                                                style={{ backgroundImage: `url(${images.product})` }}
                                            ></div>
                                            <div
                                                className="product-detail_slider-item"
                                                style={{ backgroundImage: `url(${images.product})` }}
                                            ></div>
                                            <div
                                                className="product-detail_slider-item"
                                                style={{ backgroundImage: `url(${images.product})` }}
                                            ></div>
                                            <div
                                                className="product-detail_slider-item"
                                                style={{ backgroundImage: `url(${images.product})` }}
                                            ></div>
                                        </Carousel>
                                    </div>

                                    <ul className="product-detail_contact-list">
                                        Để đặt hàng nhanh nhất, quý khách vui lòng liên hệ với EPrint qua những hình
                                        thức sau:
                                        <li className="product-detail_contact-item">
                                            {' '}
                                            <span>Email: </span> inan.eprint@gmail.com
                                        </li>
                                        <li className="product-detail_contact-item">
                                            {' '}
                                            <span>Hotline: </span> +84 869 596 313
                                        </li>
                                        <li className="product-detail_contact-item">
                                            {' '}
                                            <span>Zalo: </span>0869 596 313
                                        </li>
                                        <li className="product-detail_contact-item">
                                            <span>Website: </span>eprint.com.vn
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col l-3">
                            <div className="support">
                                <span>Bạn cần hỗ trợ?</span>
                                <div className="support-type_align">
                                    <div className="support-type_marker"></div>
                                    <div className="support-type">
                                        <span className="support-title">Tư vấn về sản phẩm: </span> <br />
                                        <span className="support-title_detail">0869 596 313</span>
                                    </div>
                                </div>
                                <div className="support-type_align">
                                    <div className="support-type_marker"></div>
                                    <div className="support-type">
                                        <span className="support-title">Nhận báo giá: </span> <br />
                                        <span className="support-title_detail">sale.eprint@gmail.com</span>
                                    </div>
                                </div>
                                <img src={images.support} alt="" />
                            </div>
                            <div className=" related-news_qs">
                                <div className="qs-common">Câu hỏi thường gặp</div>
                                <div className="qs-answer"> HỎI ĐÁP </div>
                                <ul className="qs-list">
                                    <li className="qs-list_item" onClick={toggleModal}>
                                        Chất liệu hay được sử dụng cho các loại lịch cơ bản
                                    </li>
                                    {modal && (
                                        <div className="modal">
                                            <div onClick={toggleModal} className="overlay"></div>
                                            <div className="modal-content">
                                                <div className="modal-align">
                                                    <h2 className="modal-title">
                                                        Chất liệu hay được sử dụng cho các loại lịch cơ bản
                                                    </h2>
                                                    <button className="close-modal" onClick={toggleModal}>
                                                        <CiCircleRemove />
                                                    </button>
                                                </div>
                                                <ul>
                                                    Lịch cơ bản sẽ được in trên chất liệu giấy, gỗ, mica,.. tùy vào loại
                                                    lịch cụ thể sẽ sử dụng giấy và định lượng khác nhau:
                                                    <li>
                                                        {' '}
                                                        <span>Lịch Bloc: </span>Tờ bóc của lịch thờng được sản xuất bằng
                                                        chất liệu giấy Couches Matt, phần đế lịch được sản xuất vàng
                                                        chất liệu: ván MDF hoặc carton lạnh
                                                    </li>
                                                    <li>
                                                        <span>Lịch treo tường: </span>Lịch thường được in bằng chất liệu
                                                        giấy Couches, định lượng 250 gsm hoặc 300 gsm
                                                    </li>
                                                    <li>
                                                        <span>Lịch để bàn: </span>Tờ lịch thường sẽ in trên Couches,
                                                        định lượng 250 gsm
                                                    </li>
                                                    <li>
                                                        <span>Lịch gỗ: </span>Giống với tên gọi, sản phẩm được triển
                                                        khai trên chất liệu gỗ nhữ gỗ thông, gỗ ép, ... kết hợp với gia
                                                        công khắc lazer; in phun, ... tạo nên thành phẩm
                                                    </li>
                                                </ul>
                                                <div className="modal-dscr">
                                                    Ngoài ra, sẽ có rất nhiều loại lịch làm với quy cách đặc biệt, chất
                                                    liệu khác nhau, khách hàng có nhu cầu hãy để lại liên hệ để tư vấn
                                                    chi tiết hơn.
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <li className="qs-list_item" onClick={toggleModal}>
                                        Chất liệu hay được sử dụng cho các loại lịch cơ bản
                                    </li>
                                    {modal && (
                                        <div className="modal">
                                            <div onClick={toggleModal} className="overlay"></div>
                                            <div className="modal-content">
                                                <div className="modal-align">
                                                    <h2 className="modal-title">
                                                        Chất liệu hay được sử dụng cho các loại lịch cơ bản
                                                    </h2>
                                                    <button className="close-modal" onClick={toggleModal}>
                                                        <CiCircleRemove />
                                                    </button>
                                                </div>
                                                <ul>
                                                    Lịch cơ bản sẽ được in trên chất liệu giấy, gỗ, mica,.. tùy vào loại
                                                    lịch cụ thể sẽ sử dụng giấy và định lượng khác nhau:
                                                    <li>
                                                        {' '}
                                                        <span>Lịch Bloc: </span>Tờ bóc của lịch thờng được sản xuất bằng
                                                        chất liệu giấy Couches Matt, phần đế lịch được sản xuất vàng
                                                        chất liệu: ván MDF hoặc carton lạnh
                                                    </li>
                                                    <li>
                                                        <span>Lịch treo tường: </span>Lịch thường được in bằng chất liệu
                                                        giấy Couches, định lượng 250 gsm hoặc 300 gsm
                                                    </li>
                                                    <li>
                                                        <span>Lịch để bàn: </span>Tờ lịch thường sẽ in trên Couches,
                                                        định lượng 250 gsm
                                                    </li>
                                                    <li>
                                                        <span>Lịch gỗ: </span>Giống với tên gọi, sản phẩm được triển
                                                        khai trên chất liệu gỗ nhữ gỗ thông, gỗ ép, ... kết hợp với gia
                                                        công khắc lazer; in phun, ... tạo nên thành phẩm
                                                    </li>
                                                </ul>
                                                <div className="modal-dscr">
                                                    Ngoài ra, sẽ có rất nhiều loại lịch làm với quy cách đặc biệt, chất
                                                    liệu khác nhau, khách hàng có nhu cầu hãy để lại liên hệ để tư vấn
                                                    chi tiết hơn.
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <li className="qs-list_item" onClick={toggleModal}>
                                        Chất liệu hay được sử dụng cho các loại lịch cơ bản
                                    </li>
                                    {modal && (
                                        <div className="modal">
                                            <div onClick={toggleModal} className="overlay"></div>
                                            <div className="modal-content">
                                                <div className="modal-align">
                                                    <h2 className="modal-title">
                                                        Chất liệu hay được sử dụng cho các loại lịch cơ bản
                                                    </h2>
                                                    <button className="close-modal" onClick={toggleModal}>
                                                        <CiCircleRemove />
                                                    </button>
                                                </div>
                                                <ul>
                                                    Lịch cơ bản sẽ được in trên chất liệu giấy, gỗ, mica,.. tùy vào loại
                                                    lịch cụ thể sẽ sử dụng giấy và định lượng khác nhau:
                                                    <li>
                                                        {' '}
                                                        <span>Lịch Bloc: </span>Tờ bóc của lịch thờng được sản xuất bằng
                                                        chất liệu giấy Couches Matt, phần đế lịch được sản xuất vàng
                                                        chất liệu: ván MDF hoặc carton lạnh
                                                    </li>
                                                    <li>
                                                        <span>Lịch treo tường: </span>Lịch thường được in bằng chất liệu
                                                        giấy Couches, định lượng 250 gsm hoặc 300 gsm
                                                    </li>
                                                    <li>
                                                        <span>Lịch để bàn: </span>Tờ lịch thường sẽ in trên Couches,
                                                        định lượng 250 gsm
                                                    </li>
                                                    <li>
                                                        <span>Lịch gỗ: </span>Giống với tên gọi, sản phẩm được triển
                                                        khai trên chất liệu gỗ nhữ gỗ thông, gỗ ép, ... kết hợp với gia
                                                        công khắc lazer; in phun, ... tạo nên thành phẩm
                                                    </li>
                                                </ul>
                                                <div className="modal-dscr">
                                                    Ngoài ra, sẽ có rất nhiều loại lịch làm với quy cách đặc biệt, chất
                                                    liệu khác nhau, khách hàng có nhu cầu hãy để lại liên hệ để tư vấn
                                                    chi tiết hơn.
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <li className="qs-list_item" onClick={toggleModal}>
                                        Chất liệu hay được sử dụng cho các loại lịch cơ bản
                                    </li>
                                    {modal && (
                                        <div className="modal">
                                            <div onClick={toggleModal} className="overlay"></div>
                                            <div className="modal-content">
                                                <div className="modal-align">
                                                    <h2 className="modal-title">
                                                        Chất liệu hay được sử dụng cho các loại lịch cơ bản
                                                    </h2>
                                                    <button className="close-modal" onClick={toggleModal}>
                                                        <CiCircleRemove />
                                                    </button>
                                                </div>
                                                <ul>
                                                    Lịch cơ bản sẽ được in trên chất liệu giấy, gỗ, mica,.. tùy vào loại
                                                    lịch cụ thể sẽ sử dụng giấy và định lượng khác nhau:
                                                    <li>
                                                        {' '}
                                                        <span>Lịch Bloc: </span>Tờ bóc của lịch thờng được sản xuất bằng
                                                        chất liệu giấy Couches Matt, phần đế lịch được sản xuất vàng
                                                        chất liệu: ván MDF hoặc carton lạnh
                                                    </li>
                                                    <li>
                                                        <span>Lịch treo tường: </span>Lịch thường được in bằng chất liệu
                                                        giấy Couches, định lượng 250 gsm hoặc 300 gsm
                                                    </li>
                                                    <li>
                                                        <span>Lịch để bàn: </span>Tờ lịch thường sẽ in trên Couches,
                                                        định lượng 250 gsm
                                                    </li>
                                                    <li>
                                                        <span>Lịch gỗ: </span>Giống với tên gọi, sản phẩm được triển
                                                        khai trên chất liệu gỗ nhữ gỗ thông, gỗ ép, ... kết hợp với gia
                                                        công khắc lazer; in phun, ... tạo nên thành phẩm
                                                    </li>
                                                </ul>
                                                <div className="modal-dscr">
                                                    Ngoài ra, sẽ có rất nhiều loại lịch làm với quy cách đặc biệt, chất
                                                    liệu khác nhau, khách hàng có nhu cầu hãy để lại liên hệ để tư vấn
                                                    chi tiết hơn.
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </ul>
                            </div>
                            <div className="design-trend">
                                <div className="design-trend_title">Xu hướng</div>
                                <div className="design-trend_dscr">THIẾT KẾ ĐỒ HỌA</div>
                                <ul className="design-trend-detail">
                                    <li className="design-trend-detail_item">
                                        <img src={images.trend} alt="" className="design-trend-detail_image" />
                                        <div className="design-trend-detail_dscr">
                                            <span>
                                                Chất liệu hay được sử dụng cho các loại lịch cơ bản hay được sử dụng...
                                            </span>
                                            <div className="design-trend-detail_icon">
                                                <CiClock2 />
                                                15.10.2024
                                            </div>
                                        </div>
                                    </li>
                                    <li className="design-trend-detail_item">
                                        <img src={images.trend} alt="" className="design-trend-detail_image" />
                                        <div className="design-trend-detail_dscr">
                                            <span>
                                                Chất liệu hay được sử dụng cho các loại lịch cơ bản hay được sử dụng...
                                            </span>
                                            <div className="design-trend-detail_icon">
                                                <CiClock2 />
                                                15.10.2024
                                            </div>
                                        </div>
                                    </li>
                                    <li className="design-trend-detail_item">
                                        <img src={images.trend} alt="" className="design-trend-detail_image" />
                                        <div className="design-trend-detail_dscr">
                                            <span>
                                                Chất liệu hay được sử dụng cho các loại lịch cơ bản hay được sử dụng...
                                            </span>
                                            <div className="design-trend-detail_icon">
                                                <CiClock2 />
                                                15.10.2024
                                            </div>
                                        </div>
                                    </li>
                                    <li className="design-trend-detail_item">
                                        <img src={images.trend} alt="" className="design-trend-detail_image" />
                                        <div className="design-trend-detail_dscr">
                                            <span>
                                                Chất liệu hay được sử dụng cho các loại lịch cơ bản hay được sử dụng...
                                            </span>
                                            <div className="design-trend-detail_icon">
                                                <CiClock2 />
                                                15.10.2024
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <img src={designImg.des25} alt="" className="product-detail_support-image" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid wide other-design">
                <div>
                    <div className="suggest-header__box">
                        <h1> lịch bloc </h1>
                    </div>
                    <div className="suggest-list__box">
                        <h2> Mẫu thiết kế khác</h2>
                        <ul className="suggest-list">
                            <li className="suggest-item">Xem tất cả</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col l-2-4">
                        <div className="product-grid">
                            <div className="product-image">
                                <img src={images.product} alt="" className="image" />
                                <ul className="product-links">
                                    <li className="product-link">
                                        <BsHandbag />
                                    </li>
                                    <li className="product-link">
                                        <CiSearch />
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="product-content-title">Hộp rượu nam châm</h3>
                                <ul>
                                    <li>
                                        <FaRegEye />
                                        18.000
                                    </li>
                                    <li>
                                        <CiHeart />
                                        18.000
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col l-2-4">
                        <div className="product-grid">
                            <div className="product-image">
                                <img src={images.product} alt="" className="image" />
                                <ul className="product-links">
                                    <li className="product-link">
                                        <BsHandbag />
                                    </li>
                                    <li className="product-link">
                                        <CiSearch />
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="product-content-title">Hộp rượu nam châm</h3>
                                <ul>
                                    <li>
                                        <FaRegEye />
                                        18.000
                                    </li>
                                    <li>
                                        <CiHeart />
                                        18.000
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col l-2-4">
                        <div className="product-grid">
                            <div className="product-image">
                                <img src={images.product} alt="" className="image" />
                                <ul className="product-links">
                                    <li className="product-link">
                                        <BsHandbag />
                                    </li>
                                    <li className="product-link">
                                        <CiSearch />
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="product-content-title">Hộp rượu nam châm</h3>
                                <ul>
                                    <li>
                                        <FaRegEye />
                                        18.000
                                    </li>
                                    <li>
                                        <CiHeart />
                                        18.000
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col l-2-4">
                        <div className="product-grid">
                            <div className="product-image">
                                <img src={images.product} alt="" className="image" />
                                <ul className="product-links">
                                    <li className="product-link">
                                        <BsHandbag />
                                    </li>
                                    <li className="product-link">
                                        <CiSearch />
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="product-content-title">Hộp rượu nam châm</h3>
                                <ul>
                                    <li>
                                        <FaRegEye />
                                        18.000
                                    </li>
                                    <li>
                                        <CiHeart />
                                        18.000
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col l-2-4">
                        <div className="product-grid">
                            <div className="product-image">
                                <img src={images.product} alt="" className="image" />
                                <ul className="product-links">
                                    <li className="product-link">
                                        <BsHandbag />
                                    </li>
                                    <li className="product-link">
                                        <CiSearch />
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="product-content-title">Hộp rượu nam châm</h3>
                                <ul>
                                    <li>
                                        <FaRegEye />
                                        18.000
                                    </li>
                                    <li>
                                        <CiHeart />
                                        18.000
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(DetailPage);
