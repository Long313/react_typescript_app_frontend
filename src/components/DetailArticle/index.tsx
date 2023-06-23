import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailArticle } from "../../services";
import style from "./detailArticle.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
function DetailArticle() {
  let { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<{
    id: number | string;
    slug: string;
    title: string;
    description: string;
    body: string;
    created: number;
    updated: number;
    tagList: Array<string>;
  }>({
    id: "",
    slug: "",
    title: "",
    description: "",
    body: "",
    created: 0,
    updated: 0,
    tagList: [],
  });
  const userCurrent = useSelector(
    (state: RootState) => state.auth.login?.currentUser
  );
  useEffect(() => {
    if (slug) {
      handleGetInforUser(slug);
    }
  }, []);
  const handleGetInforUser = async (slug: string) => {
    const res = await getDetailArticle(userCurrent?.user?.token, slug);
    setArticle(res?.data?.article);
  };
  const handleBackArticlesPage = () => {
    navigate("/articles");
  };
  return (
    <div className={style.container_detail}>
      <button className={style.btn_back} onClick={handleBackArticlesPage}>
        &larr; Back Articles Page
      </button>
      <h1 className={style.title}>Detail Article</h1>
      <div className={style.article}>
        <h3 className={style.title}>Title: {article?.title}</h3>
        <div className={style.content}>
          <p className={style.text_desciption}>
            Description: {article?.description}
          </p>
          <p className={style.text_body}>Body: {article?.body}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailArticle;
