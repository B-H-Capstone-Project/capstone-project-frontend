import axios from "axios";
import env from "ts-react-dotenv";

export default axios.create({
  //baseURL: `http://${}:8080`,
  baseURL: `http://${env.BACKEND_IP}:8080`
});
