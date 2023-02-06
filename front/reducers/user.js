import produce from "immer";

export const initialState = {
  loadMyInfoLoading: false, // 로그인상태 유지, 내 정보 불러오기
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadMyIntroLoading: false, // 내 자기소개서 불러오기
  loadMyIntroDone: false,
  loadMyIntroError: null,
  loadUserLoading: false, // 로그인상태 유지, 사용자 정보 불러오기
  loadUserDone: false,
  loadUserError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  introWriteLoading: false, // 자기소개서 작성 시도중
  introWriteDone: false,
  introWriteError: null,
  me: null,
  myIntro: null,
  userInfo: null,
};

export const INTRO_WRITE_REQUEST = "INTRO_WRITE_REQUEST";
export const INTRO_WRITE_SUCCESS = "INTRO_WRITE_SUCCESS";
export const INTRO_WRITE_FAILURE = "INTRO_WRITE_FAILURE";

export const LOAD_MY_INTRO_REQUEST = "LOAD_MY_INTRO_REQUEST";
export const LOAD_MY_INTRO_SUCCESS = "LOAD_MY_INTRO_SUCCESS";
export const LOAD_MY_INTRO_FAILURE = "LOAD_MY_INTRO_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOAD_USER_REQUEST =  "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS =  "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE =  "LOAD_USER_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

// export const introRequestAction = (data) => ({
//   type: INTRO_WRITE_REQUEST,
//   data,
// });

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.me = action.data;
        draft.loadMyInfoDone = true;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case LOAD_MY_INTRO_REQUEST:
        draft.loadMyIntroLoading = true;
        draft.loadMyIntroError = null;
        draft.loadMyIntroDone = false;
        break;
      case LOAD_MY_INTRO_SUCCESS:
        draft.loadMyIntroLoading = false;
        draft.myIntro = action.data;
        draft.loadMyIntroDone = true;
        break;
      case LOAD_MY_INTRO_FAILURE:
        draft.loadMyIntroLoading = false;
        draft.loadMyIntroError = action.error;
        break;
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.userInfo = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      case INTRO_WRITE_REQUEST:
        draft.introWriteLoading = true;
        draft.introWriteError = null;
        draft.introWriteDone = false;
        break;
      case INTRO_WRITE_SUCCESS:
        draft.introWriteLoading = false;
        draft.introWriteDone = true;
        break;
      case INTRO_WRITE_FAILURE:
        draft.introWriteLoading = false;
        draft.introWriteError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      default:
        break;
    }
  });

export default reducer;

// case CHANGE_NICKNAME_SUCCESS:
//   draft.me.nickname = action.data.nickname;
//   draft.changeNicknameLoading = false;
//   draft.changeNicknameError = true;
//   break;