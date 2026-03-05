import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, handleSendRequest }) => {
  const [people, setPeople] = useState(user);

  const SwipeCard = ({
    _id,
    photoUrl,
    firstName,
    lastName,
    age,
    gender,
    index,
  }) => {

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

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-20, 20]);
    const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

    const isTopCard = index === 0;

    const handleDragEnd = async (event, info) => {
      if (info.offset.x > 120) {
        // RIGHT SWIPE → interested
        await handleSendRequest("interested", _id);

        animate(x, 1000, { duration: 0.3 });
        removeCard(_id);
      } else if (info.offset.x < -120) {
        // LEFT SWIPE → ignore
        await handleSendRequest("ignore", _id);

        animate(x, -1000, { duration: 0.3 });
        removeCard(_id);
      } else {
        animate(x, 0, { duration: 0.3 });
      }
    };

    return (
      <motion.div
        className="card bg-base-300 w-96 shadow-xl absolute cursor-grab active:cursor-grabbing"
        style={{
          x,
          rotate,
          opacity,
          zIndex: people.length - index,
        }}
        drag={isTopCard ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={isTopCard ? handleDragEnd : null}
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
    );
  };

  const removeCard = (id) => {
    setTimeout(() => {
      setPeople((prev) => prev.filter((person) => person._id !== id));
    }, 200);
  };

  return (
    <div className="relative h-[600px] w-96 mx-auto mt-10">
      {people.map((user, index) => (
        <SwipeCard
          key={user._id}
          {...user}
          index={index}
        />
      ))}
    </div>
  );
};

export default UserCard;