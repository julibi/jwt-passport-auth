
import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_ALBUMS = 'FETCH_ALBUMS';

const ROOT_URL = 'https://jsonplaceholder.typicode.com';

export function fetchUsers() {
  const request = axios.get(`${ROOT_URL}/users`);

  return {
		type: FETCH_USERS,
		payload: request
	};
}

export function fetchAlbums(int) {
  const request = axios.get(`${ROOT_URL}/albums/${int}`);

  return {
    type: FETCH_ALBUMS,
    payload: request
  };
}
