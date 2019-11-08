import axios from 'axios';
export const getArea = function(){
  return axios.get('https://hdgatewaycdn.zto.com/get_basearea?ignoreProvince=710000-820000-990000')
}