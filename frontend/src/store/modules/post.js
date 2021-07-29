import postApi from "../../api/post";

export default {
	namespaced: true,

	state: {
		posts: []
	},

	mutations: {
		setPosts(state, { posts }) {
			state.posts = posts
		}
	},

	actions: {
		async getPosts({ commit }) {
			try {
				let res = await postApi.getPosts()
				//console.log(res);
				commit('setPosts', res.data)
				// req
			} catch (err) {
				console.log(err)
			}
		}
	}
}