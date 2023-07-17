<script lang="ts">
	import { centsToDollarsFormatter } from '$lib/utils/currency.formatter';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import {getColorForPercentage} from '$lib/utils/color-calculator';

	export let data: PageData;
	const amountSpent = data.expenses.reduce(
		(n, { expenseAmountCents }) => n + expenseAmountCents,
		0
	);
	const budgetRemaining = data.limit - amountSpent;
	let budgetPct = (budgetRemaining / data.limit) * 100;
	let budgetRemainingElement: HTMLElement;
	
	onMount(() => {
		const color = getColorForPercentage([132, 204, 22], [212, 25, 118], budgetPct / 100);
		budgetRemainingElement.style.color = color;
		budgetRemainingElement.style.visibility = 'visible';
	});
</script>

<div class="col-span-12">
	<h2 class="h2 text-center m-10">{data.name}</h2>
	<div class=" text-center m-10">
		<h4 class="budget-remaining h4 text-surface-300 opacity-60">Remaining</h4>
		<h1 bind:this={budgetRemainingElement} class="h1 invisible">
			{centsToDollarsFormatter(budgetRemaining)}
		</h1>
	</div>
</div>

<div
	class="
		table-container
		xl:col-start-3
		xl:col-span-8
		md:col-start-2
		md:col-span-10
		col-span-12
	"
>
	<table
		class="
			table
			md:table-comfortable
			table-hover
			table-compact
		"
	>
		<thead>
			<tr>
				<th>Description</th>
				<th>Amount</th>
				<th>Date</th>
				<th>Paid</th>
			</tr>
		</thead>
		<tbody>
			{#each data.expenses as row, i}
				<tr>
					<td class="!whitespace-normal">{row.expenseDescription}</td>
					<td>{centsToDollarsFormatter(row.expenseAmountCents)}</td>
					<td>{new Date(row.expenseDate).toLocaleDateString()}</td>
					<td
						><input
							class="checkbox"
							type="checkbox"
							name="paid-{row.id}"
							checked={row.expenseState === 'paid'}
						/></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
