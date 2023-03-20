// 业务代码中
import axios from "uniapp-axios-adapter";
export const getTest=()=> axios.get({
  url: "https://example.com/api/getUserById",
  params: {
    id: 1,
  },
});