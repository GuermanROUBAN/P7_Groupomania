import commentApi from "../../api/comment";

let state = {
}

let mutations = {
}

let actions = {
	createNewComment(context, credentials) {
		return new Promise((resolve) => {
			console.log("createNewPost")
			// Lorsqu'une mutation est actée, l'action commit prend 1 paramètre :
			// nom de la mutation ici registerStart
			// context.commit('registerStart') // commit appel mutation // eteint le bouton
			// console.log("BOOOOOMMM");
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