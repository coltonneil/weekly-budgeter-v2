<script lang="ts">
	import { goto } from '$app/navigation';
	const newBudget = () => goto('./budgets/create');
</script>

<h2 class="h2 text-surface-300 opacity-60 col-span-12 justify-self-center self-center">
	No Budgets
</h2>
<button
	on:click={newBudget}
	type="button"
	class="btn-icon btn-icon-l variant-filled place-self-end col-span-12 !bg-primary-500"
>
	<i class="fa-solid fa-plus text-2xl" />
</button>
