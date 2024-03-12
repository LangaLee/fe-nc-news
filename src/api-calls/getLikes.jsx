import axios from "axios";

const getLikes = async (username, setLikes) => {
  try {
    console.log(username, "<likes by");
    const response = await axios.get(
      `https://fun-news.onrender.com/api/users/${username}/likes`
    );
    console.log("Hi");
    const { likes } = response.data;

    setLikes([likes]);
  } catch (error) {
    console.log(error);
  }
};
export const postLikes = async (username, like) => {
  try {
    console.log(username, like);
    await axios.post(
      `https://fun-news.onrender.com/api/users/${username}/likes`,
      like
    );
  } catch (error) {
    console.log(error);
  }
};
export default getLikes;
