import postApi from "../../api/post";


let state = {
}

let mutations = {
}

let actions = {
	deleteMyPost(context, { postId, credentials }) {
		return new Promise((resolve) => {
			postApi.deleteMyPost(postId, credentials)
				.then(response => {
					console.log('deleteMyPost response', response);
					resolve();
				})
		})
	}
}
// On exporte 
export default { state, mutations, actions }