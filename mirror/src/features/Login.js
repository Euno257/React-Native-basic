import React, { Component } from 'react';
import { loginWithGoogle } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

const firebaseAuthKey = 'firebaseAuthInProgress';
const appTokenKey = 'appToken';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { splashScreen: false };
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleGoogleLogin() {
    	loginWithGoogle()
    	.catch(err => {
    		localStorage.removeItem(firebaseAuthKey)
    	});

    	// this will set the splashscreen until its overridden by the real firebaseAuthKey
    	localStorage.setItem(firebaseAuthKey, '1');
    }

    componentWillMount() {

    	// checks if we are logged in, if we are go to the home route
        if (localStorage.getItem(appTokenKey)) {
            this.props.history.push('/app/home');
            return;
        }

        firebaseAuth().onAuthStateChanged(user => {
        	if (user) {
        		localStorage.removeItem(firebaseAuthKey);
        		localStorage.setItem(appTokenKey, user.uid);
        		this.props.history.push('/app/home')
        	}
        })
    }

	render() {

		if (localStorage.getItem(firebaseAuthKey) === '1')
			return <Splashscreen />;
		return <LoginPage handleGoogleLogin={this.handleGoogleLogin} />;

	}
}

// this is the URL we copied from firebase storage
const loginButtonUrl = 'https://firebasestorage.googleapis.com/v0/b/faces-4.appspot.com/o/google-icon-white.png?alt=media&token=64b8eab9-ee87-422f-83d5-b1888d2fe3de';

const styles = {
	backgroundImage: `url(${loginButtonUrl})`
}

const LoginPage = ({ handleGoogleLogin }) => (

	<div className="login-container">
		<div onClick={handleGoogleLogin} className="login-button">
			<div style={styles} className="google-logo">
				<span className="button-text">Sign In With Google</span>
			</div>
		</div>
	</div>

)

const Splashscreen = () => (<p>Please Wait Loading...</p>);
