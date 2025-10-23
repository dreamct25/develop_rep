<template lang="pug">
Pie(:data="chartDataOptios",:options="chartOptions")
</template>
<style lang="scss" scoped>
    canvas{
        width: 100% !important;
        height: 100% !important;
    }
</style>
<script lang="ts">
import { defineComponent, toRef,toRefs,Ref,ref,inject,watch,onUnmounted,computed } from 'vue'
import { 
    Chart as ChartJS,
    Title,Tooltip, 
    Legend,
    CategoryScale, 
    LinearScale,
    ArcElement,
    DoughnutControllerChartOptions,
    ChartData,
    ChartType,
    ChartOptions
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import { ProviderObjType } from '../../App.vue'
import { ChartBackgroundColorEnum } from '..'
import { ChartPieProps } from '.'

ChartJS.register(Title,Tooltip, Legend,CategoryScale, LinearScale,ArcElement)

export default defineComponent({
    components:{
        Pie
    },
    props:['chartObj'],
    setup(props:ChartPieProps){

        const { $ } = inject<ProviderObjType>('NewProvider')

        const { chartObj } = toRefs(props)

        const chartOptions = computed<ChartOptions<'pie'>>(() => {
            const {
                pieCategory
            } = chartObj.value
            return {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: pieCategory !== '',
                        titleAlign: 'center',
                        boxPadding: 3
                    }
                }
            }
        })

        const chartDataOptios = computed<ChartData<'pie'>>(() => {
            const {
                renderData:data,
                categorys:labels,
                pieCategory:label,
                pieCategoryBackgroundColor
            } = chartObj.value

            const backgroundColor = pieCategoryBackgroundColor.length > 0 ? 
                $.maps(pieCategoryBackgroundColor,row => ChartBackgroundColorEnum[row]) : [ChartBackgroundColorEnum['RED']]

            return {
                labels,
                datasets: [{
                    label,
                    data,
                    backgroundColor,
                    hoverOffset: 4,
                    borderWidth: .5
                }]
            }
        })

        return { chartDataOptios,chartOptions }
    }
})
</script>