// 741832868763-fvgqik2o0a3j42s4mjc8dpjkja1vtsit.apps.googleusercontent.com  =>Client ID
// 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 =>secret key
import React from 'react';
// import {BrowserRouter, Route} from 'react-router-dom';
// once we have history object we are no longer using BrowserRouter 
// instead we use  plain Router
import {Router, Route, Switch} from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import StreamList from './streams/StreamList';
import StreamDelete from './streams/StreamDelete';
import Header from './Header';
import history from '../history';

const  App =() =>{
	return(
		<div className='ui container'>
			<Router history={history}>
				<div>
					<Header/>
					<Switch>
						<Route path='/' exact component={StreamList}/>
						<Route path='/streams/new' exact component={StreamCreate}/>
						<Route path='/streams/edit/:id' exact component={StreamEdit}/>
						<Route path='/streams/delete/:id' exact component={StreamDelete}/>
						<Route path='/streams/:id' exact component={StreamShow}/>
					</Switch>
				</div>
			</Router>
		</div>
	);
}
export default App;