import { useParams } from "react-router-dom";
import style from "./comments.module.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createComment, deleleComment, getComments } from "../../services";
import { toast } from "react-toastify";
function Comments() {
  const { name } = useParams();
  const [comment, setComment] = useState<string>("");
  const [listComment, setListComment] = useState<any[]>([]);
  const userCurrent = useSelector(
    (state: RootState) => state.auth.login?.currentUser
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    handleGetListComments();
  }, [name, listComment.length]);
  const handleGetListComments = async () => {
    try {
      const res = await getComments(userCurrent?.user?.token, name);
      setListComment(res.data.comments);
      //   setListComment(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateComment();
  };
  const handleCreateComment = async () => {
    try {
      const res = await createComment(userCurrent?.user?.token, name, {
        body: comment,
      });
      const newComment = res?.data?.article?.comments;
      setListComment(newComment);
      toast.success("Update User Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setComment("");
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    } catch (err) {
      console.log(err);
      toast.error("Update User Failed!", {
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
  const handleTimeComment = (time: number) => {
    const timestamp = 1684150018187;
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };
  const handleDeleteComment = (idComment: number | string) => {
    deleteCommentSelected(idComment);
  };
  const deleteCommentSelected = async (idComment: number | string) => {
    if (name) {
      try {
        const res = await deleleComment(
          userCurrent?.user?.token,
          name,
          idComment
        );
        setListComment([]);
        toast.success("Delete Comment Success!", {
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
        toast.error("Delete Comment Failed!", {
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
  const handleDetailComment = () => {};
  const handleUpdateComment = () => {};
  return (
    <div className={style.container}>
      <div className={style.container_comment}>
        <form onSubmit={handleSubmit} className={style.form_comment}>
          <textarea
            value={comment}
            className={style.textarea_comment}
            onChange={(e) => setComment(e.target.value)}
            ref={textareaRef}
          />
          <button type="submit" className={style.btn_comment}>
            Comment
          </button>
        </form>
      </div>
      <h2 className={style.list_comments}>List comments</h2>
      <ul className={style.container_list_comment}>
        {listComment.length <= 0 && (
          <li className={style.no_comment}>No have comment</li>
        )}
        {listComment.length > 0 &&
          listComment.map((comment, index) => (
            <li className={style.comment} key={comment?.id}>
              <p className={style.content}>{comment.body}</p>
              <p className={style.time}>
                {handleTimeComment(comment?.created)}
              </p>
              <p className={style.author}>
                Author: {comment?.author?.username}
              </p>
              <div className={style.container_btn}>
                <button
                  className={style.btn_detail}
                  onClick={handleDetailComment}
                >
                  Detail
                </button>
                <button
                  className={style.btn_update}
                  onClick={handleUpdateComment}
                >
                  Update
                </button>
                <button
                  className={style.btn_delete}
                  onClick={() => handleDeleteComment(comment?.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Comments;
