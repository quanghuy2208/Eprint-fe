import { useNavigate } from 'react-router-dom';
import { background } from '../../../img/index';
import './style.scss';
import * as BlogService from '../../../services/BlogService';
import { useEffect, useState } from 'react';

const NewsPage = () => {
  const navigate = useNavigate();
  const [dataBlog, setDataBlog] = useState([]);
  const [isActive, setIsActive] = useState();
  const getAllBlog = async typeBlog => {
    const res = await BlogService.getAllBlog('', 15, typeBlog);
    setDataBlog(res.data);
  };

  const handleClick = typeBlog => {
    getAllBlog(typeBlog);
    setIsActive(typeBlog);
  };
  const handleNavigateId = id => {
    navigate(`/News-detail/${id}`);
  };
  useEffect(() => {
    getAllBlog(isActive);
  }, [isActive]);
  return (
    <>
      <div className="grid banner">
        <img src={background.aboutBG} alt="" />
        <div className="banner__title">
          Tin tức EPrint
          <div className="banner__dscr">
            <span
              onClick={() => {
                navigate('/');
              }}>
              Home
            </span>{' '}
            <div className="banner__space"></div> Tin tức EPrint
          </div>
        </div>
      </div>
      <div className="grid wide news_container">
        <div className="row">
          <div className="col l-9">
            <div className="row">
              {dataBlog?.map((item, index) => (
                <div className="col l-6 ">
                  <div className="news_wrapper">
                    <img src={item.image} alt="" className="news_image" onClick={() => handleNavigateId(item._id)} />
                    <div className="news_type">{item.typeName}</div>
                    <div className="news_title" onClick={() => handleNavigateId(item._id)}>
                      {item.title}
                    </div>
                    <div className="news_published-date">
                      <span>{item.updatedAt}</span>
                      <div className="news_published-date-space"></div>by {item.author}
                    </div>
                    <div className="news_content"> {item.content}</div>
                    <button className="news-detail_button" onClick={() => handleNavigateId(item._id)}>
                      Xem Thêm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col l-3">
            <ul className="news_category">
              Danh mục bài viết
              {dataBlog?.map((item, index) => (
                <li className={isActive === item.typeSlug ? 'news_category-items active' : 'news_category-items'} onClick={() => handleClick(item.typeSlug)}>
                  {item.typeName}
                </li>
              ))}
            </ul>
            <ul className="news_blog">
              Bài viết mới nhất
              <li className="news_blog-items">Thiết kế và in ấn Menu ở đâu đẹp và chất lượng?</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewsPage;
