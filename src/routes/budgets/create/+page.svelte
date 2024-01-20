<script lang="ts">
	import { enhance } from '$app/forms';
	import { currencyFormatter } from '$lib/utils/currency.formatter';
	import { EMAIL_REGEX } from '$lib/utils/regex';
	import { InputChip } from '@skeletonlabs/skeleton';
	let allowedUsers: string[] = [];
	let budgetAmount = '$1.00';
	const isValidEmail = (value: string): boolean => EMAIL_REGEX.test(value);

	const formatBudgetAmount = (newVal: string) => {
		if (newVal === '') {
			newVal = '1';
		}
		const newValAsNumber = parseFloat(newVal.replace(/[$,]/g, ''));
		const toFormat = isNaN(newValAsNumber) ? 1 : newValAsNumber;
		budgetAmount = currencyFormatter.format(toFormat);
	};
</script>

<form
	id="form"
	class="
	xl:col-start-4
	xl:col-span-6
	md:col-start-3
	md:col-span-8
	col-span-12"
	method="POST"
	action="?/create"
	use:enhance
>
	<p class="text-4xl text-center m-6">New Budget</p>
	<div class="card p-4 text-token space-y-4">
		<input name="name" class="input" title="Input (text)" type="text" placeholder="name" required />
		<input
			name="limit"
			bind:value={budgetAmount}
			on:change={(event) => formatBudgetAmount(event.currentTarget.value)}
			class="input"
			title="Input (string)"
			type="text"
			placeholder="limit"
			required
		/>
		<InputChip
			bind:value={allowedUsers}
			name="allowedUsers"
			placeholder="other users"
			validation={isValidEmail}
		/>
	</div>
	<div class="w-full text-right">
		<button class="btn my-6 variant-filled-primary">Submit</button>
	</div>
</form>
