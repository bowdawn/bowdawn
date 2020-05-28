
import { take, put, fork } from 'redux-saga/effects';

/**
 * userList saga
 */
export function* userList() {

}

export default [
  fork(userList)
];




