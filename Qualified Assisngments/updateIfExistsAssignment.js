const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function updateIfExists(id, body) {
  const url = `${BASE_URL}/constellations/${id}`;
  return axios
    .get(url)
    .then((response) => {
    if(response == null) {
       throw "Does not exist"
       }
     return  axios.put(url, body).then(({ data }) => {
        return data;
      });
    })
    .catch((error) => {
      return error.message;
    });
}

module.exports = {
  updateIfExists,
};