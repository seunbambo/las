const hostname = window && window.location && window.location.hostname;

const Url = () => {
	if(hostname=="localhost"){
		return{
			signIn: "http://localhost:3000/api/v1/sign_in",
			signUp: "http://localhost:3000/api/v1/sign_up",
			signOut: "http://localhost:3000/api/v1/sign_out"			
		}
	}
	else {
		return {
			signIn: `http://${hostname}/api/v1/sign_in`,
			signUp: `http://${hostname}/api/v1/sign_up`,
			signOut: `http://${hostname}/api/v1/sign_out`,
			
		}
	}
}

export default Url
