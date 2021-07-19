<template>
	<div>
		<p>{{ error }}</p>
	</div>
</template>

<script>
	export default {
		name : "AppError",
		props:{
			error:{
				type: String,
				required: true,
			}
		} 
	}
</script>
