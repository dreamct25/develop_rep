{#if items.length > 0}
	{@render renderList(items)}
{/if}

{#if loading && displayCount !== 0}
	<div class="loading">{$i18n.t('loadingPhoto')}</div>
{/if}

{#if hasMore}
	<div class="check-line" bind:this={sentinel}></div>
{/if}

<style lang="scss" scoped>
	.loading {
		padding: 12px 0;
		text-align: center;
		color: white;
        grid-column: 1 / 6;
	}

    .check-line {
        height: 2px;
    }
</style>

<script lang="ts">
	import { onDestroy } from 'svelte';
    import { i18n } from '../i18next'

	interface Props {
		list: any;
		pageSize: number;
		triggerOffset?: number;
		renderList: (items: typeof list) => any;
	}

	 let {
		list,
		pageSize,
		triggerOffset = 0,
		renderList
    }: Props = $props();

	let displayCount = $state(0);
	let loading = $state(false);

	let sentinel = $state<HTMLDivElement | null>(null);
	let observer: IntersectionObserver | null = null;
	let timer: any = 0;

    let items = $state<typeof list>([])
    let hasMore = $state(false)

    $effect(() => {

        items = list.slice(0, displayCount);

        hasMore = displayCount < list.length;

        if(list.length === 0) displayCount = 0

    })
    
	const loadMore: () => void = () => {
		if (loading || !hasMore) return;

		loading = true;

		clearTimeout(timer);
		timer = setTimeout(() => {
			displayCount = displayCount + pageSize;
			loading = false;
		}, 500);
	}

	$effect(() => {
		if (!sentinel) return;

		observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					loadMore();
				}
			},
			{ rootMargin: `${triggerOffset}px` }
		);

		observer.observe(sentinel);

        return () => observer?.disconnect();
	});

	onDestroy(() => {
		clearTimeout(timer);
	});
</script>