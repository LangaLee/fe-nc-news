import axios from "axios";

const addVotes = async (id) => {
  try {
    const response = await axios.patch(
      `https://fun-news.onrender.com/api/articles/${id}`,
      { inc_votes: 1 }
    );
  } catch (error) {
    console.log(error);
  }
};

export default addVotes;
