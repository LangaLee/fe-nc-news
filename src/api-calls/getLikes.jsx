import axios from "axios";

const getLikes = async (username, setLikes, article_id) => {
  try {
    const response = await axios.get(
      `https://fun-news.onrender.com/api/users/${username}/${article_id}/likes`
    );
    const { likes } = response.data;
    setLikes(likes);
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
