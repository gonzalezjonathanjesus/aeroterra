import axios from 'axios';

export const getLocationList = async () => {
  const response = await axios({
    url: 'http://localhost:5000/api/locationlist',
    method: 'get'
  })

  return response.data
}