import { memo, useState, useEffect } from 'react';
import { images } from '../../../img/index';
import { CiClock2 } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { BsHandbag } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { CiCircleRemove } from 'react-icons/ci';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ProductService from '../../../services/ProductService';
import './style.scss';
import './function.js';
import { Pagination } from 'antd';

const ProductTypePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
    limit: 20,
    total: 1,
  });
  const fetchProductType = async (typeSlug, page, limit) => {
    const res = await ProductService.getProductType(typeSlug, page, limit);
    console.log('🚀 ~ fetchProductType ~ res:', res);
    if (res?.status === 'OK') {
      setProducts(res?.data);
      setPaginate({ ...paginate, total: res?.totalPage });
    } else {
    }
  };

  const handleNavigateId = id => {
    navigate(`/Product-detail/${id}`);
  };
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (state) {
      fetchProductType(state, paginate.page, paginate.limit);
    }
  }, [state, paginate.page, paginate.limit]);
  const onChange = (current, pageSize) => {
    setPaginate({ ...paginate, page: current - 1, limit: pageSize });
  };
  return (
    <>
      <div className="grid product">
        <div className="grid wide content">
          {products.map((item, index) => (
            <div>
              <div className="suggest-header__box">
                <h1
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/');
                  }}>
                  {' '}
                  Home / {item.typeName}{' '}
                </h1>
              </div>
              <div className="suggest-list__box">
                <h2> Thư viện {item.typeName}</h2>
                <ul className="suggest-list">
                  <li className="suggest-item">Tất cả</li>
                </ul>
              </div>
            </div>
          ))}
          <div className="row">
            {products.map((item, index) => (
              <div className="col l-2-4">
                <div className="product-grid" onClick={() => handleNavigateId(item._id)}>
                  <div className="product-image">
                    <img src={item.image} alt="" className="image" />
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
                    <h3 className="product-content-title">{item.name}</h3>
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
            ))}
          </div>
          <div className="row product_paginate">
            <Pagination defaultCurrent={paginate.page + 1} total={paginate?.total} onChange={onChange} style={{ textAlign: 'center', marginTop: '30px' }} />
          </div>
        </div>
      </div>
      <div className="grid unique-method_background">
        <div className="grid wide unique-method">
          <div>
            <div className="suggest-header__box">
              <h1>tư vấn quy cách </h1>
            </div>
            <div className="suggest-list__box">
              <h2> In ấn lịch độc quyền</h2>
            </div>
          </div>
          <div className="row unique-method-background">
            <div className="col l-4 unique-method-image">
              <img src={images.unique} alt=""></img>
              <div className="button-align">
                <button id="scroll-to-top-btn" className="button-unique">
                  <span className="text">Chọn mẫu thiết kế</span>
                </button>
              </div>
            </div>
            <div className="col l-8">
              <div className="unique-method-dscr">Quy cách in ấn lịch Tết thường sẽ có nhiều bước khác nhau, phụ thuộc vào từng yêu cầu khác nhau của mỗi khách hàng. Tuy nhiên nhìn chung đều có những quy trình về:</div>
              <div className="scroll-container">
                <div className="unique-method-dscr-title">Chất liệu giấy in lịch Tết:</div>
                <div className="unique-method-dscr">
                  Hiện nay có rất nhiều loại giấy khác nhau được ứng dụng làm giấy lịch, mỗi loại đều sẽ có những điểm mạnh riêng, tạo nên độ bền đẹp, chắc chắn cho sản phẩm. Cụ thể được kể đến như:
                  <ul className="unique-method-material">
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Couche Matt: </span>
                      Là loại giấy được phủ một lớp cao lanh mờ, có bề mặt mịn, không phản xạ ánh sáng, giúp hình ảnh in lên có độ sắc nét và chân thực. Được sử dụng phổ biến trong in lịch để bàn, lịch bloc, lịch treo tường.
                    </li>
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Kraft: </span>Là loại giấy được làm từ bột gỗ tái chế có bề mặt thô nhám, màu vàng nâu, nên loại giấy này có độ bền kém hơn so với các loại giấy khác. Loại này thường được sử dụng để in lịch nghệ thuật, lịch độc đáo, lịch mang phong cách cổ điển
                    </li>
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Duplex: </span> Là loại giấy được tráng một mặt láng, một mặt sần. Giấy Duplex thường được sử dụng để in lịch treo tường, lịch bloc có kích thước lớn. Nhược điểm là bề mặt khó in các chi tiết nhỏ.
                    </li>
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Conqueror: </span>Là loại giấy cao cấp nên có giá thành khá cao, được làm từ bột giấy nguyên chất, không chứa chất tẩy trắng. Giấy Conqueror có bề mặt mịn, độ bền cao, màu sắc in lên đẹp. Loại này thường được sử dụng để in lịch treo tường, lịch bloc cao cấp.
                    </li>
                  </ul>
                  <ul className="unique-method-material">
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Couche Matt: </span>
                      Là loại giấy được phủ một lớp cao lanh mờ, có bề mặt mịn, không phản xạ ánh sáng, giúp hình ảnh in lên có độ sắc nét và chân thực. Được sử dụng phổ biến trong in lịch để bàn, lịch bloc, lịch treo tường.
                    </li>
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Kraft: </span>Là loại giấy được làm từ bột gỗ tái chế có bề mặt thô nhám, màu vàng nâu, nên loại giấy này có độ bền kém hơn so với các loại giấy khác. Loại này thường được sử dụng để in lịch nghệ thuật, lịch độc đáo, lịch mang phong cách cổ điển
                    </li>
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Duplex: </span> Là loại giấy được tráng một mặt láng, một mặt sần. Giấy Duplex thường được sử dụng để in lịch treo tường, lịch bloc có kích thước lớn. Nhược điểm là bề mặt khó in các chi tiết nhỏ.
                    </li>
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Conqueror: </span>Là loại giấy cao cấp nên có giá thành khá cao, được làm từ bột giấy nguyên chất, không chứa chất tẩy trắng. Giấy Conqueror có bề mặt mịn, độ bền cao, màu sắc in lên đẹp. Loại này thường được sử dụng để in lịch treo tường, lịch bloc cao cấp.
                    </li>
                  </ul>
                  <ul className="unique-method-material">
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Couche Matt: </span>
                      Là loại giấy được phủ một lớp cao lanh mờ, có bề mặt mịn, không phản xạ ánh sáng, giúp hình ảnh in lên có độ sắc nét và chân thực. Được sử dụng phổ biến trong in lịch để bàn, lịch bloc, lịch treo tường.
                    </li>
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Kraft: </span>Là loại giấy được làm từ bột gỗ tái chế có bề mặt thô nhám, màu vàng nâu, nên loại giấy này có độ bền kém hơn so với các loại giấy khác. Loại này thường được sử dụng để in lịch nghệ thuật, lịch độc đáo, lịch mang phong cách cổ điển
                    </li>
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Duplex: </span> Là loại giấy được tráng một mặt láng, một mặt sần. Giấy Duplex thường được sử dụng để in lịch treo tường, lịch bloc có kích thước lớn. Nhược điểm là bề mặt khó in các chi tiết nhỏ.
                    </li>
                    <li className="unique-method-dscr">
                      <span className="unique-method-dscr-title">Giấy Conqueror: </span>Là loại giấy cao cấp nên có giá thành khá cao, được làm từ bột giấy nguyên chất, không chứa chất tẩy trắng. Giấy Conqueror có bề mặt mịn, độ bền cao, màu sắc in lên đẹp. Loại này thường được sử dụng để in lịch treo tường, lịch bloc cao cấp.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid related-news_background">
        <div className="grid wide related-news_content">
          <div>
            <div className="suggest-header__box">
              <h1>related news </h1>
            </div>
            <div className="suggest-list__box">
              <h2> Bài viết liên quan</h2>
            </div>
          </div>
          <div className="row">
            <div className="col l-3 related-news_item">
              <div className="news">
                <img src={images.news} alt="" className="news-img"></img>
                <div className="news-body">
                  <div className="news-name">Thiết kế và in ấn Menu ở đâu đẹp và chất lượng?</div>
                  <p className="news-dscr">Menu có vai trò vô cùng quan trọng và là thứ không thể thiếu trong các nhà hàng,...</p>
                  <div>
                    <ul className="news-list">
                      <li className="news-number">
                        <FaPencilAlt className="news-icon" />
                        Eprint
                      </li>
                      <li className="news-number">
                        <FaRegEye className="news-icon" />
                        1500
                      </li>
                      <li className="news-number">
                        <CiClock2 className="news-icon" />
                        15.10.2024
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col l-3 related-news_item">
              <div className="news">
                <img src={images.news} alt="" className="news-img"></img>
                <div className="news-body">
                  <div className="news-name">Thiết kế và in ấn Menu ở đâu đẹp và chất lượng?</div>
                  <p className="news-dscr">Menu có vai trò vô cùng quan trọng và là thứ không thể thiếu trong các nhà hàng,...</p>
                  <div>
                    <ul className="news-list">
                      <li className="news-number">
                        <FaPencilAlt className="news-icon" />
                        Eprint
                      </li>
                      <li className="news-number">
                        <FaRegEye className="news-icon" />
                        1500
                      </li>
                      <li className="news-number">
                        <CiClock2 className="news-icon" />
                        15.10.2024
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col l-3 related-news_item">
              <div className="news">
                <img src={images.news} alt="" className="news-img"></img>
                <div className="news-body">
                  <div className="news-name">Thiết kế và in ấn Menu ở đâu đẹp và chất lượng?</div>
                  <p className="news-dscr">Menu có vai trò vô cùng quan trọng và là thứ không thể thiếu trong các nhà hàng,...</p>
                  <div>
                    <ul className="news-list">
                      <li className="news-number">
                        <FaPencilAlt className="news-icon" />
                        Eprint
                      </li>
                      <li className="news-number">
                        <FaRegEye className="news-icon" />
                        1500
                      </li>
                      <li className="news-number">
                        <CiClock2 className="news-icon" />
                        15.10.2024
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col l-3 related-news_qs">
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
                        <h2 className="modal-title">Chất liệu hay được sử dụng cho các loại lịch cơ bản</h2>
                        <button className="close-modal" onClick={toggleModal}>
                          <CiCircleRemove />
                        </button>
                      </div>
                      <ul>
                        Lịch cơ bản sẽ được in trên chất liệu giấy, gỗ, mica,.. tùy vào loại lịch cụ thể sẽ sử dụng giấy và định lượng khác nhau:
                        <li>
                          {' '}
                          <span>Lịch Bloc: </span>Tờ bóc của lịch thờng được sản xuất bằng chất liệu giấy Couches Matt, phần đế lịch được sản xuất vàng chất liệu: ván MDF hoặc carton lạnh
                        </li>
                        <li>
                          <span>Lịch treo tường: </span>Lịch thường được in bằng chất liệu giấy Couches, định lượng 250 gsm hoặc 300 gsm
                        </li>
                        <li>
                          <span>Lịch để bàn: </span>Tờ lịch thường sẽ in trên Couches, định lượng 250 gsm
                        </li>
                        <li>
                          <span>Lịch gỗ: </span>Giống với tên gọi, sản phẩm được triển khai trên chất liệu gỗ nhữ gỗ thông, gỗ ép, ... kết hợp với gia công khắc lazer; in phun, ... tạo nên thành phẩm
                        </li>
                      </ul>
                      <div className="modal-dscr">Ngoài ra, sẽ có rất nhiều loại lịch làm với quy cách đặc biệt, chất liệu khác nhau, khách hàng có nhu cầu hãy để lại liên hệ để tư vấn chi tiết hơn.</div>
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
                        <h2 className="modal-title">Chất liệu hay được sử dụng cho các loại lịch cơ bản</h2>
                        <button className="close-modal" onClick={toggleModal}>
                          <CiCircleRemove />
                        </button>
                      </div>
                      <ul>
                        Lịch cơ bản sẽ được in trên chất liệu giấy, gỗ, mica,.. tùy vào loại lịch cụ thể sẽ sử dụng giấy và định lượng khác nhau:
                        <li>
                          {' '}
                          <span>Lịch Bloc: </span>Tờ bóc của lịch thờng được sản xuất bằng chất liệu giấy Couches Matt, phần đế lịch được sản xuất vàng chất liệu: ván MDF hoặc carton lạnh
                        </li>
                        <li>
                          <span>Lịch treo tường: </span>Lịch thường được in bằng chất liệu giấy Couches, định lượng 250 gsm hoặc 300 gsm
                        </li>
                        <li>
                          <span>Lịch để bàn: </span>Tờ lịch thường sẽ in trên Couches, định lượng 250 gsm
                        </li>
                        <li>
                          <span>Lịch gỗ: </span>Giống với tên gọi, sản phẩm được triển khai trên chất liệu gỗ nhữ gỗ thông, gỗ ép, ... kết hợp với gia công khắc lazer; in phun, ... tạo nên thành phẩm
                        </li>
                      </ul>
                      <div className="modal-dscr">Ngoài ra, sẽ có rất nhiều loại lịch làm với quy cách đặc biệt, chất liệu khác nhau, khách hàng có nhu cầu hãy để lại liên hệ để tư vấn chi tiết hơn.</div>
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
                        <h2 className="modal-title">Chất liệu hay được sử dụng cho các loại lịch cơ bản</h2>
                        <button className="close-modal" onClick={toggleModal}>
                          <CiCircleRemove />
                        </button>
                      </div>
                      <ul>
                        Lịch cơ bản sẽ được in trên chất liệu giấy, gỗ, mica,.. tùy vào loại lịch cụ thể sẽ sử dụng giấy và định lượng khác nhau:
                        <li>
                          {' '}
                          <span>Lịch Bloc: </span>Tờ bóc của lịch thờng được sản xuất bằng chất liệu giấy Couches Matt, phần đế lịch được sản xuất vàng chất liệu: ván MDF hoặc carton lạnh
                        </li>
                        <li>
                          <span>Lịch treo tường: </span>Lịch thường được in bằng chất liệu giấy Couches, định lượng 250 gsm hoặc 300 gsm
                        </li>
                        <li>
                          <span>Lịch để bàn: </span>Tờ lịch thường sẽ in trên Couches, định lượng 250 gsm
                        </li>
                        <li>
                          <span>Lịch gỗ: </span>Giống với tên gọi, sản phẩm được triển khai trên chất liệu gỗ nhữ gỗ thông, gỗ ép, ... kết hợp với gia công khắc lazer; in phun, ... tạo nên thành phẩm
                        </li>
                      </ul>
                      <div className="modal-dscr">Ngoài ra, sẽ có rất nhiều loại lịch làm với quy cách đặc biệt, chất liệu khác nhau, khách hàng có nhu cầu hãy để lại liên hệ để tư vấn chi tiết hơn.</div>
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
                        <h2 className="modal-title">Chất liệu hay được sử dụng cho các loại lịch cơ bản</h2>
                        <button className="close-modal" onClick={toggleModal}>
                          <CiCircleRemove />
                        </button>
                      </div>
                      <ul>
                        Lịch cơ bản sẽ được in trên chất liệu giấy, gỗ, mica,.. tùy vào loại lịch cụ thể sẽ sử dụng giấy và định lượng khác nhau:
                        <li>
                          {' '}
                          <span>Lịch Bloc: </span>Tờ bóc của lịch thờng được sản xuất bằng chất liệu giấy Couches Matt, phần đế lịch được sản xuất vàng chất liệu: ván MDF hoặc carton lạnh
                        </li>
                        <li>
                          <span>Lịch treo tường: </span>Lịch thường được in bằng chất liệu giấy Couches, định lượng 250 gsm hoặc 300 gsm
                        </li>
                        <li>
                          <span>Lịch để bàn: </span>Tờ lịch thường sẽ in trên Couches, định lượng 250 gsm
                        </li>
                        <li>
                          <span>Lịch gỗ: </span>Giống với tên gọi, sản phẩm được triển khai trên chất liệu gỗ nhữ gỗ thông, gỗ ép, ... kết hợp với gia công khắc lazer; in phun, ... tạo nên thành phẩm
                        </li>
                      </ul>
                      <div className="modal-dscr">Ngoài ra, sẽ có rất nhiều loại lịch làm với quy cách đặc biệt, chất liệu khác nhau, khách hàng có nhu cầu hãy để lại liên hệ để tư vấn chi tiết hơn.</div>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(ProductTypePage);
