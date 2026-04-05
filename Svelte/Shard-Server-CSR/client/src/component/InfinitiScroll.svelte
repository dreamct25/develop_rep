{#if items.length > 0}
	{@render renderList(items)}
{/if}

{#if hasMore}
	<div class="check-line" bind:this={sentinel}></div>
{/if}

<style lang="scss" scoped>
	
	:global(.loading-per-results) {
		padding: 4px 0 7px 0;
		text-align: center;
		color: white;
        position: absolute;
		left: 0;
		right: 0;
		bottom: 0px;
		width: 135px;
		margin: 0 auto;
		font-size: 14px;
		border-radius: 8px;
		backdrop-filter: blur(6px);
		background-color: rgba(30, 30, 30, .5);
		box-shadow: inset 0 0 1px 0 rgba(255, 255, 255, .7);
		opacity: 0;
		z-index: 99;
		pointer-events: none;
		transition: bottom .5s ease, opacity .5s ease;
	}

	:global(.loading-per-results.toggle) {
		opacity: 1;
		bottom: 12px;
	}

    .check-line {
        height: 2px;
    }
</style>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
    import { i18n } from '../i18next'

	interface Props {
		mountedElement: Element
		list: any;
		pageSize: number;
		triggerOffset?: number;
		renderList: (items: typeof list) => any;
	}

	 let {
		mountedElement,
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

    let items = $derived<typeof list>(list.slice(0, displayCount))
    let hasMore = $derived(displayCount < list.length)

	let loadingElement: HTMLDivElement

	const loadMore: () => void = () => {
		
		if (loading || !hasMore) return;

		if(displayCount !== 0) {
			loadingElement.textContent = $i18n.t('loadingPhoto')
			loadingElement.className = "loading-per-results toggle"
		}

		loading = true;

		clearTimeout(timer);

		timer = setTimeout(async () => {
			
			displayCount = displayCount + pageSize;

			loading = false;

			loadingElement.className = "loading-per-results"

		}, 500);
	}

	$effect(() => {

        if(list.length === 0) displayCount = 0
		
    })

	$effect(() => {
		if (!sentinel) return;

		observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) loadMore();
			},
			{ 
				root: mountedElement,
				rootMargin: `${triggerOffset}px` 
			}
		);

		observer.observe(sentinel);

        return () => observer?.disconnect();
	});

	onMount(() => {

		if(mountedElement) {
			loadingElement = document.createElement('div')
			loadingElement.className = 'loading-per-results'
			loadingElement.textContent = $i18n.t('loadingPhoto')
			mountedElement.after(loadingElement)
		}
	})

	onDestroy(() => {
		clearTimeout(timer);
		loadingElement.remove()
	});
</script>