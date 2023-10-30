const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

async function update(constellation) {
  try {
    const url = `${BASE_URL}/constellations/${constellation.id}`;
    const result = await axios.put(url, constellation)
    return await result
} catch(err) {
      return `There was an error: ${err}`;
    }
}

async function bulkImport(constellations) {
  try {
    if(!Array.isArray(constellations)) {
      throw "Inputted argument must be an array."
  }
   if(constellations.every((constellation) => isValid(constellation))) {
      return Promise.allSettled(constellations.map((constellation) => update(constellation)))
    } else {
      throw "All constellations must include relevant fields."
    }
  } catch (err) {
      return err
    }
}

module.exports = { bulkImport, update };
