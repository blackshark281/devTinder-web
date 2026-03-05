import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import {motion, useMotionValue, useTransform, animate} from "framer-motion";
import { useState } from "react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender} = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  // const [isGone, setIsGone] = useState(false);

  const x = useMotionValue(0);

  // Rotate based on horizontal drag
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  // Optional opacity effect
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleDragEnd = async(event, info) => {
    if (info.offset.x > 120) {
      // Right swipe
      await handleSendRequest("interested", _id)
      animate(x, 1000, { duration: 0.3 });
      setIsGone(true);
    } else if (info.offset.x < -120) {
      // Left swipe
      await handleSendRequest("ignore", _id)
      animate(x, -1000, { duration: 0.3 });
      setIsGone(true);
    } else {
      // Snap back
      animate(x, 0, { duration: 0.3 });
    }
  };

  // if (isGone) return null;

  return (
    <div className="flex justify-center mt-10">
      <motion.div
        className="card bg-base-300 w-96 shadow-xl cursor-grab active:cursor-grabbing"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      >
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">
            {firstName + " " + lastName}
          </h2>

          {age && gender && (
            <p>{age + ", " + gender}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
export default UserCard;