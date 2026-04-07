<div class="tooltip" style={`--posX: ${pos.x};--posY:${pos.y};--arrowPosX:${arrowPosX};--width:${width};--padding:${padding};`}>
    {@render children()}
</div>
<style lang="scss" scoped>
    .tooltip{
        color: black;
        font-size: 15px;
        position: absolute;
        border-radius: 6.4px;
        text-align: center;
        transform: translate(var(--posX), var(--posY));
        width: var(--width);
        opacity: 0;
        z-index: -1;
        transition: .7s ease;
        background-color: white;
        padding: var(--padding);

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top-color: white;
            transform: translate(var(--arrowPosX), 12px);
            transition: .7s ease;
        }
    }
</style>
<script lang="ts">
    let { width = '0', pos = { x: '-6px',y: '12px' }, arrowPosX = '0px', padding = '6px', children } = $props()
</script>