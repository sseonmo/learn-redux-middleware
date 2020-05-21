import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer, {rootSaga} from "./modules";
// import myLogger from "./middlewares/myLogger"; test용 미들웨어
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import {BrowserRouter, Router} from "react-router-dom";
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const customHistory = createBrowserHistory();

// 사가 미들웨어를 만듭니다.
const sagaMiddleware = createSagaMiddleware({
	context: {
		history: customHistory
	}
});

// 로거를 사용하는경우 가장 마지막에 와야한다.
const store = createStore(rootReducer,
	devtools(
		applyMiddleware(ReduxThunk.withExtraArgument({history: customHistory}),
			sagaMiddleware, // 사가 미들웨어를 적용하고
			logger)
	));
// const store = createStore(rootReducer, devtools(applyMiddleware(ReduxThunk, logger)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Router history={customHistory}>
		<Provider store={store}>
			<App/>
		</Provider>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
