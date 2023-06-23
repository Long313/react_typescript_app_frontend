import { useEffect, useRef, useState } from "react";
import style from "./articles.module.scss";
import {
  createArticle,
  deleteArticle,
  getListArticles,
  updateArticle,
} from "../../services";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SubNavigate from "../SubNavigate";
interface Article {
  slug?: string;
  author?: any;
  id?: number;
  title?: string;
  description?: string;
  body?: string;
}
function Article() {
  const [status, setStatus] = useState("create");
  const [slug, setSlug] = useState("");
  const [isFinishUpdate, setIsFinishedUpdate] = useState<boolean>(false);
  const [listArticles, setListArticles] = useState<Article[] | any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const [tagList, setTagList] = useState<Array<string>>([]);
  const userCurrent = useSelector(
    (state: RootState) => state.auth.login?.currentUser
  );
  const navigate = useNavigate();
  const handleCreateArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewArticle();
  };
  const createNewArticle = async () => {
    if (title && description && body && tagList.length > 0) {
      try {
        await createArticle(userCurrent?.user?.token, {
          title,
          description,
          body,
          tagList,
        });
        setListArticles(["", ""]);
        toast.success("Create article success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTitle("");
        setDescription("");
        setBody("");
        setTag("");
        if (titleRef.current) {
          titleRef.current.focus();
        }
      } catch (err) {
        toast.error("Create article failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const handleGetTagList = (e: any) => {
    setTag(e.target.value);
    setTagList([...tagList, e.target.value]);
  };
  useEffect(() => {
    handleGetListArticles();
  }, [listArticles.length]);
  const handleGetListArticles = async () => {
    try {
      const res = await getListArticles(userCurrent?.user?.token);
      setListArticles(res?.data?.articles);
    } catch (err) {
      console.log("Error", err);
    }
  };
  const handleUpdateArticle = (slug: string) => {
    setStatus("update");
    if (titleRef.current) {
      titleRef.current.focus();
    }
    setSlug(slug);
  };
  useEffect(() => {
    if (isFinishUpdate && status === "update") handleClickUpdate(slug);
  }, [isFinishUpdate, status]);
  const handleClickUpdate = async (slug: string) => {
    try {
      await updateArticle(userCurrent?.user?.token, slug, {
        title,
        description,
        body,
        tagList,
      });
      setListArticles([]);
      toast.success("Update Article Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
      toast.error("Update Article Failed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setStatus("create");
    setIsFinishedUpdate(false);
  };
  const handleDetailArticle = (slug: string) => {
    navigate(`/articles/${slug}`);
  };
  const handleDeleteArticle = (slug: string) => {
    handleRemoveArticle(slug);
  };

  const handleRemoveArticle = async (slug: string) => {
    try {
      await deleteArticle(userCurrent?.user?.token, slug);
      setListArticles([]);
      toast.success("Delete Article Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log("Error", err);
      toast.error("Delete Article Failed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleShowCommentsArticle = (slug: string) => {
    navigate(`/article/${slug}/comments`);
  };
  return (
    <>
      <SubNavigate />
      <div className={style.container_articles}>
        <div className={style.container_form}>
          <form onSubmit={handleCreateArticle}>
            <div className={style.form}>
              <h2 className={style.title}>
                {status === "create" ? "Create Article" : "Update Article"}
              </h2>
              <div className={style.field}>
                <label htmlFor="title" className={style.title_name}>
                  Title
                </label>
                <input
                  id="title"
                  className={style.field_input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title"
                  ref={titleRef}
                />
              </div>
              <div className={style.field}>
                <label htmlFor="description" className={style.title_name}>
                  Description
                </label>
                <textarea
                  id="description"
                  className={style.field_input}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description"
                />
              </div>
              <div className={style.field}>
                <label htmlFor="body" className={style.title_name}>
                  Body
                </label>
                <textarea
                  id="body"
                  className={style.field_input}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter a body"
                />
              </div>
              <div className={style.field}>
                <label htmlFor="tag" className={style.title_name}>
                  Tag List
                </label>
                <input
                  id="tag"
                  className={style.field_input}
                  value={tag}
                  onChange={(e) => handleGetTagList(e)}
                  placeholder="Enter a tag list"
                />
              </div>
              {status === "create" ? (
                <button type="submit" className={style.btn_create_article}>
                  Create Article
                </button>
              ) : (
                <button
                  className={style.btn_create_article}
                  onClick={() => setIsFinishedUpdate(true)}
                >
                  Update Article
                </button>
              )}
            </div>
          </form>
        </div>
        <div className={style.container_list}>
          {listArticles.length > 0 &&
            listArticles.map((article) => (
              <div key={article.id} className={style.article}>
                <p className={style.row}>
                  <span className={style.field_name}>Title:</span>{" "}
                  {article?.title}
                </p>
                <p className={style.row}>
                  <span className={style.field_name}>Description:</span>{" "}
                  {article?.description}
                </p>
                <p className={style.row}>
                  <span className={style.field_name}>Body:</span>{" "}
                  {article?.body}
                </p>
                <p className={style.row}>
                  <span className={style.field_name}>Author:</span>{" "}
                  {article.author?.username}
                </p>
                <div className={style.container_btn}>
                  <button
                    className={style.btn_detail}
                    onClick={() => handleDetailArticle(article.slug)}
                  >
                    Detail
                  </button>
                  <button
                    className={style.btn_update}
                    onClick={() => handleUpdateArticle(article.slug)}
                  >
                    Update
                  </button>
                  <button
                    className={style.btn_delete}
                    onClick={() => handleDeleteArticle(article.slug)}
                  >
                    Delete
                  </button>
                  <button
                    className={style.btn_comment}
                    onClick={() => handleShowCommentsArticle(article.slug)}
                  >
                    Show Comments
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Article;
