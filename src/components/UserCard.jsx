import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import {motion, useMotionValue, useTransform, animate} from "framer-motion";
import { useState } from "react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender} = user;
  const dispatch = useDispatch();

  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragEnd = async (event, info) => {
    if (info.offset.x > 120) {
      // RIGHT SWIPE
      await animate(x, 1000, { duration: 0.3 });
      await handleSendRequest("interested");
    } 
    else if (info.offset.x < -120) {
      // LEFT SWIPE
      await animate(x, -1000, { duration: 0.3 });
      await handleSendRequest("ignore");
    } 
    else {
      animate(x, 0, { type: "spring", stiffness: 300 });
    }
  };

  return (
    <motion.div
      className="card bg-base-300 w-96 shadow-xl absolute cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && gender && <p>{age + ", " + gender}</p>}
      </div>
    </motion.div>
  );
};
export default UserCard;