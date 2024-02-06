import axios from "axios";

const updateVotes = async (id, increment, setErrorVoting) => {
  try {
    setErrorVoting(false);
    if (increment) {
      const response = await axios.patch(
        `https://fun-news.onrender.com/api/articles/${id}`,
        { inc_votes: 1 }
      );
    } else {
      const response = await axios.patch(
        `https://fun-news.onrender.com/api/articles/${id}`,
        { inc_votes: -1 }
      );
    }
  } catch (error) {
    console.log(error.message);
    if (error.message === "Network Error") {
      setErrorVoting(true);
    }
  }
};

export default updateVotes;
