import axios from "axios";

const getLikes = async (username, setLikes, article_id, setLikesLoaded) => {
  try {
    const response = await axios.get(
      `https://fun-news.onrender.com/api/users/${username}/${article_id}/likes`
    );
    const { likes } = response.data;
    if (likes === undefined) setLikes({ likes: 0 });
    else setLikes(likes);
    setLikesLoaded(true);
  } catch (error) {
    console.log(error);
  }
};
export const postLikes = async (username, like) => {
  try {
    await axios.post(
      `https://fun-news.onrender.com/api/users/${username}/likes`,
      like
    );
  } catch (error) {
    console.log(error);
  }
};
export const patchLikes = async (username, article_id, like) => {
  try {
    await axios.patch(
      `https://fun-news.onrender.com/api/users/${username}/${article_id}/likes`,
      like
    );
  } catch (error) {
    console.log(error);
  }
};
export default getLikes;
