import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import style from "./home.module.scss";
import { deleteUser, getAllUsers, updateUser } from "../../services";
import { toast } from "react-toastify";
import SubNavigate from "../SubNavigate";
interface User {
  id: string | number;
  username: string;
  email: string;
  bio: string;
  image: string;
}
function Home() {
  const [status, setStatus] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isFinishUpdate, setIsFinishedUpdate] = useState<boolean>(false);
  const [listUsers, setListUsers] = useState<Array<any>>([]);
  const userNameRef = useRef<HTMLInputElement>(null);
  const userCurrent = useSelector(
    (state: RootState) => state.auth.login?.currentUser
  );
  const navigate = useNavigate();
  const handleUserDetail = (user: { username: string }) => {
    navigate(`/users/${user?.username}`);
  };
  useEffect(() => {
    handleGetListUsers();
  }, [listUsers.length, status, isFinishUpdate]);
  const handleGetListUsers = async () => {
    try {
      const res = await getAllUsers(userCurrent?.user?.token);
      setListUsers(res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteUser = (userEmail: any) => {
    removeUser(userEmail);
  };
  const removeUser = async (userEmail: any) => {
    try {
      await deleteUser(userCurrent?.user?.token, userEmail);
      toast.success("Delete User Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setListUsers([""]);
      setIsFinishedUpdate(false);
      setStatus("");
    } catch (err) {
      toast.error("Delete User Failed!", {
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
  const handleUpdateUser = (user: {
    username: string;
    email: string;
    bio: string;
    image: string;
  }) => {
    setStatus("update");
    const { username, email, bio, image } = user;
    setUsername(username);
    setEmail(email);
    setBio(bio);
    setImage(image);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFinishedUpdate(true);
  };
  useEffect(() => {
    if (isFinishUpdate && status === "update") handleClickUpdate();
  }, [isFinishUpdate, status]);
  const handleClickUpdate = async () => {
    try {
      const res = await updateUser(userCurrent?.user?.token, {
        username,
        email,
        bio,
        image,
      });
      setListUsers([]);
      setUsername("");
      setEmail("");
      setBio("");
      setImage("");
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
  return (
    <div className={style.container_list_user}>
      <SubNavigate />
      {status === "update" ? (
        <div className={style.container_form_update_user}>
          <form onSubmit={handleSubmit}>
            <div className={style.form_update_user}>
              <h2 className={style.title_update}>Update User</h2>
              <div className={style.field}>
                <label htmlFor="title" className={style.field_name}>
                  Username
                </label>
                <input
                  id="title"
                  className={style.field_input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter a username"
                  ref={userNameRef}
                />
              </div>
              <div className={style.field}>
                <label htmlFor="email" className={style.field_name}>
                  Email
                </label>
                <input
                  id="email"
                  className={style.field_input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter a email"
                />
              </div>
              <div className={style.field}>
                <label htmlFor="bio" className={style.field_name}>
                  Bio
                </label>
                <input
                  id="bio"
                  className={style.field_input}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter a bio"
                />
              </div>
              <div className={style.field}>
                <label htmlFor="image" className={style.field_name}>
                  Image
                </label>
                <input
                  id="image"
                  className={style.field_input}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter a image"
                />
              </div>
              <div className={style.container_btn_update_user}>
                <button className={style.btn_update_user} type="submit">
                  Update User
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      <h1 className={style.title_list_user}>List User</h1>
      <ul className={style.list_user}>
        <li className={style.user}>
          <p className={style.name_column}>ID</p>
          <p className={style.name_column}>Username</p>
          <p className={style.name_column}>Email</p>
          <p className={style.name_column}>Bio</p>
          <p className={style.name_column}>Image</p>
          <p className={style.name_column}>Action</p>
        </li>
        {listUsers.length > 0 &&
          listUsers.map(
            (user: User): JSX.Element => (
              <li key={user.id} className={style.user}>
                <p className={style.field}>{user.id}</p>
                <p className={style.field}>{user.username}</p>
                <p className={style.field}>{user.email}</p>
                <p className={style.field}>{user.bio}</p>
                <p className={style.field}>{user.image}</p>
                <div className={style.field}>
                  <button
                    className={style.btn_detail}
                    onClick={() => handleUserDetail(user)}
                  >
                    Detail
                  </button>
                  <button
                    className={style.btn_update}
                    onClick={() => handleUpdateUser(user)}
                  >
                    Update
                  </button>
                  <button
                    className={style.btn_delete}
                    onClick={() => handleDeleteUser(user.email)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          )}
      </ul>
    </div>
  );
}

export default Home;
