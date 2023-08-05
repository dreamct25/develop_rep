import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'
import { 
    Login,
    Main,
    AddExpenditure,
    AddIncome,
    CurrentExpenditureMonth,
    CurrentIncomeMonth,
    EveryExpenditureMonth,
    EveryIncomeMonth,
    LastestTotal,
    CostTest,
    Error404
} from '../container'

const routeSetting:RouteRecordRaw[] = [{
    path:'/:catchAll(.*)',
    redirect: '/404'
},{
    path:'/login',
    name:'login',
    component: Login,
},{
    path: '/main',
    name: 'main',
    component: Main,
    children:[{
        path: 'add_expenditure',
        name: 'addExpenditure',
        components: {
            addExpenditure:AddExpenditure
        }
    },{
        path: 'edit_expenditure',
        name: 'editExpenditure',
        components: {
            addExpenditure:AddExpenditure
        }
    },{
        path: 'add_income',
        name: 'addIncome',
        components: {
            addIncome:AddIncome
        }
    },{
        path: 'edit_income',
        name: 'addIncome',
        components: {
            addIncome:AddIncome
        }
    },{
        path: 'current_expenditure_month',
        name: 'currentExpenditureMonth',
        components: {
            currentExpenditureMonth:CurrentExpenditureMonth
        }
    },{
        path: 'current_income_month',
        name: 'currentIncomeMonth',
        components: {
            currentIncomeMonth:CurrentIncomeMonth
        }
    },{
        path: 'every_expenditure_month',
        name: 'everyExpenditureMonth',
        components: {
            everyExpenditureMonth:EveryExpenditureMonth
        }
    },{
        path: 'every_income_month',
        name: 'everyIncomeMonth',
        components: {
            everyIncomeMonth:EveryIncomeMonth
        }
    },{
        path: 'lastest_total',
        name: 'lastestTotal',
        components: {
            lastestTotal:LastestTotal
        }
    },{
        path: 'cost_test',
        name: 'costTest',
        components: {
            costTest:CostTest
        }
    }]
},{
    path: '/404',
    name: 'Error404',
    component: Error404
}]

export default createRouter({
    history: createWebHistory('/cash'),
    routes: routeSetting
})