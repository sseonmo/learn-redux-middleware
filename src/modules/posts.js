import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import {
	createPromiseThunk,
	reducerUtils,
	handleAsyncActions,
	createPromiseThunkById,
	handleAsyncActionsById,
	createPromiseSaga,
	createPromiseSagaById
} from '../lib/asyncUtils';
import {put, call, takeEvery, getContext} from "@redux-saga/core/effects";

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS';                  // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';  // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';      // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 포스트 비우기
const CLEAR_POST = 'CLEAR_POST';

// home move
const GO_TO_HOME = 'GO_TO_HOME';

export const goToHome = () => ({type: GO_TO_HOME});


// 액션생성함수 예제
// export const increase = () => ({ type: INCREASE });

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.
// export const getPosts = () => async dispatch => {
// 	dispatch({ type: GET_POSTS }); // 요청이 시작됨
// 	try {
// 		const posts = await postsAPI.getPosts(); // API 호출
// 		dispatch({ type: GET_POSTS_SUCCESS, posts }); // 성공
// 	} catch (e) {
// 		dispatch({ type: GET_POSTS_ERROR, error: e }); // 실패
// 	}
// };

// redux-thunk
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// react-saga
export const getPosts = () => ({type: GET_POSTS});

// thunk 함수에서도 파라미터를 받아와서 사용 할 수 있습니다.
// export const getPost = id => async dispatch => {
// 	dispatch({ type: GET_POST }); // 요청이 시작됨
// 	try {
// 		const post = await postsAPI.getPostById(id); // API 호출
// 		dispatch({ type: GET_POST_SUCCESS, post }); // 성공
// 	} catch (e) {
// 		dispatch({ type: GET_POST_ERROR, error: e }); // 실패
// 	}
// };

// redux-thunk
// export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

// redux-saga
// payload는 파라미터 용도, meta는 리듀서에서 id를 알기위한 용도
export const getPost = (id) => ({type: GET_POST, payload: id, meta: id });

// function* getPostsSaga() {
// 	try {
// 		// call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.
// 		const posts = yield call(postsAPI.getPosts);
// 		yield put({
// 			type: GET_POSTS_SUCCESS,
// 			payload: posts
// 		}); // 성공 액션 디스패치
// 	} catch (e) {
// 		yield put({
// 			type: GET_POSTS_ERROR,
// 			error: true,
// 			payload: e
// 		}); // 실패 액션 디스패치
// 	}
// }
export const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);

// 액션이 지니고 있는 값을 조회하고 싶다면 action을 파라미터로 받아와서 사용 할 수 있습니다.
// function* getPostSaga(action) {
// 	const param = action.payload;
// 	const id = action.meta;
// 	try {
// 		const post = yield call(postsAPI.getPostById, param); // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
// 		yield put({
// 			type: GET_POST_SUCCESS,
// 			payload: post,
// 			meta: id
// 		});
// 	} catch (e) {
// 		yield put({
// 			type: GET_POST_ERROR,
// 			error: true,
// 			payload: e,
// 			meta: id
// 		});
// 	}
// }
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

// 사가들을 합치기
export function* postsSaga() {
	console.log('사가들 합치기', "postsSaga");
	yield takeEvery(GET_POSTS, getPostsSaga);
	yield takeEvery(GET_POST, getPostSaga);
	yield takeEvery(GO_TO_HOME, goToHomeSaga);
}

// export const clearPost = () => ({type:CLEAR_POST});
/*
const initialState = {
	posts: {
		loading: false,
		data: null,
		error: null
	},
	post: {
		loading: false,
		error: null
	}
};
*/

// reducer Utils 사용
/*
{
	loading: false,
	data: initialData,
	error: null
}
*/
const initialState = {
	posts: reducerUtils.initial(),
	// post : reducerUtils.initial()
	post: {}
};

export default function posts(state = initialState, action) {
	// switch (action.type) {
	// 	case GET_POSTS:
	// 		return {
	// 			...state,
	// 			posts: {
	// 				loading: true,
	// 				data: null,
	// 				error: null
	// 			}
	// 		};
	// 	case GET_POSTS_SUCCESS:
	// 		return {
	// 			...state,
	// 			posts: {
	// 				loading: true,
	// 				data: action.posts,
	// 				error: null
	// 			}
	// 		};
	// 	case GET_POSTS_ERROR:
	// 		return {
	// 			...state,
	// 			posts: {
	// 				loading: true,
	// 				data: null,
	// 				error: action.error
	// 			}
	// 		};
	// 	case GET_POST:
	// 		return {
	// 			...state,
	// 			post: {
	// 				loading: true,
	// 				data: null,
	// 				error: null
	// 			}
	// 		};
	// 	case GET_POST_SUCCESS:
	// 		return {
	// 			...state,
	// 			post: {
	// 				loading: true,
	// 				data: action.post,
	// 				error: null
	// 			}
	// 		};
	// 	case GET_POST_ERROR:
	// 		return {
	// 			...state,
	// 			post: {
	// 				loading: true,
	// 				data: null,
	// 				error: action.error
	// 			}
	// 		};
	// 	default:
	// 		return state;
	// }
	switch (action.type) {
		case GET_POSTS:
		case GET_POSTS_SUCCESS:
		case GET_POSTS_ERROR:
			return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
		// 위와 동일함
		// const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
		// return postsReducer(state, action);
		case GET_POST:
		case GET_POST_SUCCESS:
		case GET_POST_ERROR:
			return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
		// case CLEAR_POST:
		// 	return {
		// 		...state,
		// 		post: reducerUtils.initial()
		// 	};
		default:
			return state;
	}
}

// redux-thunk
// 3번째 인자를 사용하면 withExtraArgument 에서 넣어준 값들을 사용 할 수 있습니다.
// export const goToHome = () => (dispatch, getState, {history}) => {
// 	history.push('/');
// };

// redux-saga
function* goToHomeSaga() {
	const history = yield getContext('history');
	history.push('/');
}