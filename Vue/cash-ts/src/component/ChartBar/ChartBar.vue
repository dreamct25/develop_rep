<template lang="pug">
Bar(:data="chartDataOptios",:options="chartOptions")
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
    BarElement,
    DoughnutControllerChartOptions,
    ChartData,
    ChartType,
    ChartOptions
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { ProviderObjType } from '../../App.vue'
import { ChartBackgroundColorEnum } from '..'
import { ChartBarProps } from '.'

ChartJS.register(Title,Tooltip, Legend,CategoryScale, LinearScale,BarElement)

export default defineComponent({
    components:{
        Bar
    },
    props:['chartObj'],
    setup(props:ChartBarProps){

        const { $ } = inject<ProviderObjType>('NewProvider')

        const { chartObj } = toRefs(props)

        const chartOptions = computed<ChartOptions<'bar'>>(() => {
            const {
                pieCategory,
                renderData
            } = chartObj.value
            return {
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255,255,255,.3)'
                        },
                        ticks: {
                            color: 'rgb(255,255,255)'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid:{
                            color: 'rgba(255,255,255,.3)',
                        },
                        ticks: {
                            color: 'rgb(255,255,255)',
                            crossAlign: 'center',
                            maxTicksLimit: renderData.filter(row => row !== 0).length > 0 ? 10 : 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'rgb(255,255,255)'
                        }
                    },
                    tooltip: {
                        enabled: pieCategory !== '',
                        titleAlign: 'center',
                        boxPadding: 3,
                        xAlign: 'center',
                        yAlign: 'bottom'
                    }
                }
            }
        })

        const chartDataOptios = computed<ChartData<'bar'>>(() => {
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
                    borderColor: $.createArray({ type: 'fake',item: { random: data.length } },() => ChartBackgroundColorEnum['LIGHTBLUE']),
                    hoverOffset: 4,
                    borderWidth: 1
                }]
            }
        })

        return { chartDataOptios,chartOptions }
    }
})
</script>