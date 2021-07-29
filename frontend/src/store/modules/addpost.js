import postApi from "../../api/post";

let state = {
}

let mutations = {
}

let actions = {
	createNewPost(context, credentials) {
		return new Promise((resolve) => {
			// console.log("createNewPost")
			postApi.createNewPost(credentials)
				.then(response => {
					console.log('createNewPost response', response);

					resolve();
				})
		})
	}
}
// On exporte 
export default { state, mutations, actions }