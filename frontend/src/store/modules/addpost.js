import postApi from "../../api/post";

let state = {
}



let mutations = {
}


let actions = {
	createNewPost(context, credentials) {
		return new Promise((resolve) => {
			console.log("createNewPost")
			//Lorsqu'une mutation est actée, l'action commit prend 1 paramètre :
			// nom de la mutation ici registerStart
			//context.commit('registerStart') // commit appel mutation // eteint le bouton
			// console.log("BOOOOOMMM");
			postApi.createNewPost(credentials)
				.then(response => {
					if (response.ok) {
						response.json().then(json => { // le json c'est la reponse de notre serveur (user, token)
							console.log('createNewPost response', json);

							resolve()
						})
					}
				})
		})
	}
}
// On exporte 
export default { state, mutations, actions }