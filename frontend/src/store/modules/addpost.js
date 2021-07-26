import postApi from "../../api/post";

let state = {
}

let mutations = {
}

let actions = {
	createNewPost(context, credentials) {
		return new Promise((resolve) => {
			console.log("createNewPost")
			// Lorsqu'une mutation est actée, l'action commit prend 1 paramètre :
			// nom de la mutation ici registerStart
			// context.commit('registerStart') // commit appel mutation // eteint le bouton
			// console.log("BOOOOOMMM");
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