import commentApi from "../../api/comment";

let state = {
}

let mutations = {
}

let actions = {
	createNewComment(context, credentials) {
		return new Promise((resolve) => {
			// console.log("createNewPost")
			commentApi.createNewComment(credentials)
				.then(response => {
					console.log('createNewComment response', response);
					resolve();
				})
		})
	}
}
// On exporte 
export default { state, mutations, actions }