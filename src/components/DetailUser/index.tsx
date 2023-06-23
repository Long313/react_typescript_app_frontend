import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfor } from "../../services";
import style from "./detailUser.module.scss";
function DetailUser() {
  let { userName } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{
    username: string;
    bio: string;
    image: string;
  }>({
    username: "",
    bio: "",
    image: "",
  });
  console.log("userName", userName);
  useEffect(() => {
    if (userName) {
      handleGetInforUser(userName);
    }
  }, [userName]);
  const handleGetInforUser = async (userName: string) => {
    const res = await getUserInfor(userName);
    setProfile(res.data.profile);
  };
  const handleBackHomePage = () => {
    navigate("/");
  };
  return (
    <div className={style.container_detail}>
      <button className={style.btn_back} onClick={handleBackHomePage}>
        &larr; Back Home Page
      </button>
      <h1 className={style.title}>User Profile</h1>
      <div className={style.container_infor}>
        <p className={style.feild}>
          <span className={style.field_name}>Username:</span>
          <span className={style.field_value}> {profile?.username}</span>
        </p>
        <p className={style.feild}>
          <span className={style.field_name}>Bio:</span>
          <span className={style.field_value}>
            {" "}
            {profile?.bio ||
              "This user has not added bio to user's profile yet"}
          </span>
        </p>
        <p className={style.feild}>
          <span className={style.field_name}>Image:</span>
          <span className={style.field_value}>
            {" "}
            {profile?.image ||
              "This user has not updated user's profile picture yet"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default DetailUser;
