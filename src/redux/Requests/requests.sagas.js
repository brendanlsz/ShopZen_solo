import { auth } from "./../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  setRequests,
  setRequest,
  setUserRequests,
  fetchRequestsStart,
} from "./requests.actions";
import {
  handleAddRequest,
  handleFetchRequests,
  handleFetchRequest,
  handleFetchUserRequests,
  handleDeleteRequest,
} from "./requests.helpers";
import requestsTypes from "./requests.types";

export function* addRequest({ payload }) {
  try {
    const timestamp = new Date();
    yield handleAddRequest({
      ...payload,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchRequestsStart());
  } catch (err) {
    // console.log(err);
  }
}

export function* onAddRequestStart() {
  yield takeLatest(requestsTypes.ADD_NEW_REQUEST_START, addRequest);
}

export function* fetchRequests({ payload }) {
  try {
    const requests = yield handleFetchRequests(payload);
    yield put(setRequests(requests));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchRequestsStart() {
  yield takeLatest(requestsTypes.FETCH_REQUESTS_START, fetchRequests);
}

export function* fetchUserRequests({ payload }) {
  try {
    const requests = yield handleFetchUserRequests(payload);
    yield put(setUserRequests(requests));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchUserRequestsStart() {
  yield takeLatest(requestsTypes.FETCH_USER_REQUESTS, fetchUserRequests);
}

export function* deleteRequest({ payload }) {
  try {
    yield handleDeleteRequest(payload);
    yield put(fetchRequestsStart());
  } catch (err) {
    // console.log(err);
  }
}

export function* onDeleteRequestStart() {
  yield takeLatest(requestsTypes.DELETE_REQUEST_START, deleteRequest);
}

export function* fetchRequest({ payload }) {
  try {
    const request = yield handleFetchRequest(payload);
    yield put(setRequest(request));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchRequestStart() {
  yield takeLatest(requestsTypes.FETCH_REQUEST_START, fetchRequest);
}

export default function* requestsSagas() {
  yield all([
    call(onAddRequestStart),
    call(onFetchRequestsStart),
    call(onDeleteRequestStart),
    call(onFetchRequestStart),
    call(onFetchUserRequestsStart),
  ]);
}
