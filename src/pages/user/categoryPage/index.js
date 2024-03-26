import { memo } from 'react';
import React, { useEffect } from 'react';
import { categoryImg, background } from '../../../img/index';
import './style.scss';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="grid banner">
        <img src={background.categoryBG} alt="" />
        <div className="banner__title">
          Danh mục sản phẩm
          <div className="banner__dscr">
            <span>Home</span> <div className="banner__space"></div> Danh mục sản phẩm
          </div>
        </div>
      </div>
      <div className="grid category-list">
        <div className="grid wide category-content">
          <div className="row">
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate1} alt="" className="category-item_image"></img>
                <div className="category__name">Lịch tết</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate2} alt="" className="category-item_image"></img>
                <div className="category__name">Catalogue</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate3} alt="" className="category-item_image"></img>
                <div className="category__name">Profile</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate4} alt="" className="category-item_image"></img>
                <div className="category__name">Brochure</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate5} alt="" className="category-item_image"></img>
                <div className="category__name">Hộp</div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate6} alt="" className="category-item_image"></img>
                <div className="category__name">Standee</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate7} alt="" className="category-item_image"></img>
                <div className="category__name">Backdrop</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate8} alt="" className="category-item_image"></img>
                <div className="category__name">Tờ rơi</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate9} alt="" className="category-item_image"></img>
                <div className="category__name">Thiệp</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate10} alt="" className="category-item_image"></img>
                <div className="category__name">Voucher</div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate11} alt="" className="category-item_image"></img>
                <div className="category__name">Sticker</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate12} alt="" className="category-item_image"></img>
                <div className="category__name">Tem nhãn</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate13} alt="" className="category-item_image"></img>
                <div className="category__name">Túi đựng</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate14} alt="" className="category-item_image"></img>
                <div className="category__name">Card visit</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate15} alt="" className="category-item_image"></img>
                <div className="category__name">Menu</div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate16} alt="" className="category-item_image"></img>
                <div className="category__name">Thùng carton</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate17} alt="" className="category-item_image"></img>
                <div className="category__name">Booth</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate18} alt="" className="category-item_image"></img>
                <div className="category__name">Photobooth</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate19} alt="" className="category-item_image"></img>
                <div className="category__name">Giấy khen</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate20} alt="" className="category-item_image"></img>
                <div className="category__name">Sổ tay</div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate21} alt="" className="category-item_image"></img>
                <div className="category__name">Lì xì</div>
              </Link>
            </div>
            <div className="col l-2-4 category-display">
              <Link to={'Product-type'} className="category-item">
                <img src={categoryImg.cate22} alt="" className="category-item_image"></img>
                <div className="category__name">Phong bì thư</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(CategoryPage);
