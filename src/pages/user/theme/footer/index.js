import { memo } from 'react';
import './style.scss';
import './function';
import { images } from '../../../../img/index';
const Footer = () => {
    return (
        <>
            <div className="grid wide content">
                <div className="row">
                    <div className="col l-3">
                        <div className="achievement-align">
                            <p className="achievement-number" id="exp-count"></p>
                            <p className="achievement-dscr">năm kinh nghiệm</p>
                        </div>
                    </div>
                    <div className="col l-3">
                        <div className="achievement-align">
                            <p className="achievement-number" id="customer-count"></p>
                            <p className="achievement-dscr">khách hàng</p>
                        </div>
                    </div>
                    <div className="col l-3">
                        <div className="achievement-align">
                            <p className="achievement-number" id="order-count"></p>
                            <p className="achievement-dscr">đơn hàng</p>
                        </div>
                    </div>
                    <div className="col l-3">
                        <div className="achievement-align">
                            <p className="achievement-number" id="satify-count"></p>
                            <p className="achievement-dscr">khách hàng hài lòng</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="grid footer">
                <p className="row icon title">NHẬP ĐỊA CHỈ EMAIL CỦA BẠN ĐỂ NHẬN NGAY 100.000 VNĐ</p>
                <form action="#" className="row">
                    <div className="group">
                        <input type="text" placeholder="Email của bạn"></input>
                        <button type="submit" className="button-submit">
                            Nhận ngay
                        </button>
                    </div>
                </form>
                <div className="grid wide">
                    <div className="row footer-align">
                        <div className="col l-3 slogan">
                            <img src={images.logo2} alt="" />
                            <div className="icon-dscr">
                                <p className="footer_dscr">
                                    Chuyên cung cấp dịch vụ in ấn và thiết kế đa ngành nghề hàng đầu tại Việt Nam
                                </p>
                            </div>
                            <div className="contact">
                                <p className="icon">Theo dõi chúng tôi</p>
                                <div className="footer__widget__social">
                                    <img src={images.tiktok} alt="" />
                                    <img src={images.facebook} alt="" />
                                    <img src={images.linkIn} alt="" />
                                    <img src={images.youtube} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col l-3 slogan">
                            <p className="icon">Liên hệ Eprint</p>
                            <ul className="icon-dscr">
                                <li className="footer_dscr">
                                    <span>Email:</span> inan.eprint@gmail.com
                                </li>
                                <li className="footer_dscr">
                                    <span>Hotline:</span> +84 869 596 313
                                </li>
                                <li className="footer_dscr">
                                    <span>Zalo:</span> 0869 596 313
                                </li>
                                <li className="footer_dscr">
                                    <span>Website:</span> eprint.com.vn
                                </li>
                            </ul>
                            <div className="">
                                <p className="icon">Thông tin</p>
                                <div className="icon-dscr__box">
                                    <ul className="icon-dscr">
                                        <li className="footer_dscr">Về chúng tôi</li>
                                        <li className="footer_dscr">Chính sách</li>
                                    </ul>
                                    <ul className="icon-dscr">
                                        <li className="footer_dscr">In ấn</li>
                                        <li className="footer_dscr">Thiết kế</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col l-6 slogan">
                            <p className="icon">Địa chỉ</p>
                            <ul className="icon-dscr">
                                <li className="footer_dscr">
                                    <span>Trụ sở chính:</span> 23/28 Nguyên Hồng, Phường Láng Hạ, Quận Đống Đa, Thành
                                    phố Hà Nội.
                                </li>
                                <li className="footer_dscr">
                                    <span>Xưởng in 1:</span> Cụm làng nghề Triều Khúc, Xã Tân Triều, Huyện Thanh Trì,
                                    Thành phố Hà Nội.
                                </li>
                                <li className="footer_dscr">
                                    <span>Xưởng in 2:</span> Đường Trần Phú, Quận Hà Đông, Thành phố Hà Nội.
                                </li>
                            </ul>
                            <div className="footer__certificate">
                                <img src={images.certificate} alt="" />
                                <img src={images.DMCA} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default memo(Footer);
