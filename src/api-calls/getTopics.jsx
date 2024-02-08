import axios from "axios";

const getTopics = async (setTopics, setIsLoading) => {
  try {
    const response = await axios.get(
      "https://fun-news.onrender.com/api/Topics"
    );
    const { topics } = response.data;
    setTopics(topics);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export default getTopics;
