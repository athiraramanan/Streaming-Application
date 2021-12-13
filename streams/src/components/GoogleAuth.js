import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
	// state = { isSignedIn: null };
	// This is only need to load first time when app loads we want to 
	// know whether the user signed in or not
	// so we can put it inside the componentDidMount lifecycle
	componentDidMount(){
		window.gapi.load('client:auth2', () =>{
			window.gapi.client.init({
				clientId: '741832868763-fvgqik2o0a3j42s4mjc8dpjkja1vtsit.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				// this.setState({isSignedIn: this.auth.isSignedIn.get()});
				this.onAuthChange(this.auth.isSignedIn.get())
				this.auth.isSignedIn.listen(this.onAuthChange)
			});	
		});
	}

	onSignOutClick = () =>{
		this.auth.signOut();	
	}

	onSignInClick = () =>{
		this.auth.signIn();
	}

	onAuthChange = (isSignedIn) => {
		if(isSignedIn){
			// call action creator sign in
			return this.props.signIn(this.auth.currentUser.get().getId());
		}
		else{
			return this.props.signOut();
		}
	}

	renderAuthButton(){
		if(this.props.isSignedIn==null){

			return(<div>I don't know whether the user signed in or not</div>);
		}
		else if(this.props.isSignedIn){
			return(
				<button onClick={this.onSignOutClick} className='ui red google button'>
					<i className='google icon'/>
					Sign Out
				</button>
			);
		}
		else{
			return(
				<button onClick={this.onSignInClick} className='ui red google button'>
					<i className='google icon'/>
					Sign In with Google
				</button>
			);
		}
	}

	render(){
		return(
			<div>{this.renderAuthButton()}</div>
		);
	};

}

const mapStateToProps = (state) =>{
	return {isSignedIn: state.auth.isSignedIn}
}
export default connect(mapStateToProps,{signIn, signOut})(GoogleAuth);