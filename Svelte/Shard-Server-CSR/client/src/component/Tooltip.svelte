<div class="tooltip" style={`transform:translate(${pos.x}px,${pos.y}px);width:${width}px;padding:${padding};`}>
    {@render children()}
</div>
<style lang="scss" scoped>
    .tooltip{
        color: black;
        font-size: 15px;
        position: absolute;
        border-radius: 6.4px;
        text-align: center;
        transform: translate(0,0);
        width: 0;
        opacity: 0;
        z-index: -1;
        transition: .7s ease;
        background-color: white;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top-color: white;
            transform: translate(-6px, 12px);
            transition: .7s ease;
        }
    }
</style>
<script lang="ts">
    let { width = 0, pos = { x: 0,y: 0 }, padding = '6px', children } = $props()
</script>