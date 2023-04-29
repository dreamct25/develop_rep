<div>
    <div on:click={goPage.bind(this,'/pageI','bbb')}>
        go pageI
    </div>
    <div on:click={goPage.bind(this,'/pageII','aaa')}>
        go pageII
    </div>
    <Router basepath={'/'}>
        {#each routes as { Path,Component }}
            {#if Path.includes(':')}
                <Route path={Path} let:location let:params>
                    <Component params={params}  />
                </Route>
            {:else}
                <Route path={Path} component={Component} let:location />
            {/if}
        {/each}
    </Router>
</div>
<style lang="scss" scoped>

</style>
<script lang="ts">
    import { Router,Route,navigate } from 'svelte-routing'
    import routes from '../../routes'
    // push('/pageI')
    const goPage:(route:string,params:string) => void = (route,params) => {
        navigate(`${route}/${params}`,{
            state:{a:10}
        })
    }
</script>