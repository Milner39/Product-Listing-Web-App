<script setup lang="tsx">
// #region Imports

import Header from "~/components/Header/Header.vue"
import Nav from "~/components/Header/Nav.vue"

// #endregion Imports
</script>

<template>
	<Header>
		<template #nav>
			<Nav/>
		</template>
	</Header>
	<NuxtPage/>
</template>