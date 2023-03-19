import axios from "axios";
import env from "ts-react-dotenv";

// console.log(env.BACKEND_IP);
export default axios.create({
<<<<<<< HEAD
  // baseURL: `http://${env.BACKEND_IP}:8080`,
  baseURL: `http://localhost:8080`,
});
=======
    baseURL: `http://${env.BACKEND_IP}:8080`
});  
>>>>>>> 5e65e79 (finished mobile css)
