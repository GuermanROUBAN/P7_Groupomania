import commentApi from "../../api/comment";


let state = {
}

let mutations = {
}

let actions = {
	deleteMyComment(context, { commentId, credentials }) {
		console.log('deleteMyComment');
		return new Promise((resolve) => {
			commentApi.deleteMyComment(commentId, credentials)
				.then(response => {
					console.log('deleteMyComment response', response);

					resolve();
				})
		})
	}
}
// On exporte 
export default { state, mutations, actions }