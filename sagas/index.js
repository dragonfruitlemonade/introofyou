import { all, fork } from "redux-saga/effects";
import axios from "axios";

import userSaga from "./user";

axios.defaults.withCredentials = true; // 쿠키 공유하기

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
