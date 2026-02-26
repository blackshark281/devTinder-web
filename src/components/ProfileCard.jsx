import axios from "axios";
import { useDispatch } from "react-redux";

const ProfileCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender} = user;
  const dispatch = useDispatch();

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
      </div>
    </div>
  );
};
export default ProfileCard;