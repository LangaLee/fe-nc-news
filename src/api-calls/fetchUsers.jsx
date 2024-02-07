import axios from "axios";

const fetchUsers = async (setUsers, setIsLoading) => {
  try {
    const reponse = await axios.get("https://fun-news.onrender.com/api/users");
    const users = reponse.data.users;
    setUsers(users);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export default fetchUsers;
