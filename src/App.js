import React from 'react';

// component container
import CounterContainer from './containers/CounterContainer';
import PostListContainer from './containers/PostListContainer';

// route 적용
import {Route} from 'react-router-dom';
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";


function App() {
	// return <CounterContainer />;
	// return <PostListContainer />;

	return (
		// Fragments - Fragments는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화할 수 있다 / 약식사용 <React.Fragment></React.Fragment>
		<>
			< CounterContainer/>
			< Route path="/" component={PostListPage} exact/>
			< Route path="/:id" component={PostPage}/>
		</>
	)
}

export default App;