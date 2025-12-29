<script setup>
import { ref,computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { Line } from "vue-chartjs";
import vSelect from 'vue-select';
import { modifyBudget } from "./store";
import 'vue-select/dist/vue-select.css';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  plugins
} from "chart.js";
let budget = modifyBudget();
let budgetType=ref("Income");
let sortOptions=[
{ name:'Price',icon:'arrow_drop_down'},
 {name:'Price', icon:'arrow_drop_up'},
];
let sortType=ref(sortOptions[0]);
let isMenu=ref(false);
let currentDate=ref(new Intl.DateTimeFormat("en-us",{month: "short", day: "numeric", year: "numeric",}).format(new Date()));
   let yesterdayDate=ref(new Date());
   yesterdayDate.value.setDate(yesterdayDate.value.getDate()-1);
   yesterdayDate.value=new Intl.DateTimeFormat("en-us",{month: "short", day: "numeric", year: "numeric",}).format(yesterdayDate.value);
let incomeArray=computed(()=>{
  return [...budget.income];
});
let incomeAmounts=computed(()=>incomeArray.value.map((item)=>item.amount));
let incomeDates=computed(()=>incomeArray.value.map((item)=>item.date));
let expenseArray=computed(()=>{
  return [...budget.expense];
});
expenseArray.value.sort((a,b)=>new Date(a.date)-new Date(b.date));
let expenseAmounts=computed(()=>expenseArray.value.map((item)=>-item.amount));
let expenseDates=computed(()=>expenseArray.value.map((item)=>item.date));
let incomeArrayToSort=computed(()=>{
  if(sortType.value.icon=="arrow_drop_down"){
    return budget.income.sort((a,b)=>a.amount-b.amount);
  }else if(sortType.value.icon=="arrow_drop_up"){
    return budget.income.sort((a,b)=>b.amount-a.amount);
  }
});
let expenseArrayToSort=computed(()=>{
  if(sortType.value.icon=="arrow_drop_down"){
    return budget.expense.sort((a,b)=>b.amount-a.amount);
  }else if(sortType.value.icon=="arrow_drop_up"){
    return budget.expense.sort((a,b)=>a.amount-b.amount);
  }
});
console.log(incomeArray.value);
console.log(expenseArray.value);
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  plugins
);
const chartDataIncome = ref({
  labels: incomeDates,
  datasets: [
    {
      data: incomeAmounts,
      backgroundColor: "#D2D1CD",
      fill:"origin",
      tension:0.4,
    },
  ],
});
const chartOptions= ref({
   responsive:true,
   plugins:{
    legend:{
      display:false,
    },
   },

});
const chartDataExpense = ref({
  labels: expenseDates,
  datasets: [
    {
      data: expenseAmounts,
      backgroundColor: "#D2D1CD",
      fill:"origin",
      tension:0.4,
    },
  ],
});
let goToMenu = ()=>{
  isMenu.value=!isMenu.value;
}
let isActiveLink=(routePath)=>{
       const route=useRoute();
       return route.path==routePath;
   }

</script>
<template>
  <div class="dashboard-body">
    <div class="statsnav">
      <h3>Statistics</h3>
      <button id="menu-btn" @click="goToMenu">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
    <div class="statshero">
      <button>Day</button>
      <button>Week</button>
      <button>Month</button>
      <button>Year</button>
      <v-select v-model="budgetType" :options="['Income','Expense']" class="selectbudgettype"></v-select>
      <div class="areachart">
        <Line v-if="budgetType=='Income'" id="Line" :options="chartOptions" :data="chartDataIncome" ></Line>
        <Line v-if="budgetType=='Expense'" id="Line" :options="chartOptions" :data="chartDataExpense" ></Line>
      </div>
    </div>
    <div class="topspending">
      <div class="topspending-title">
      <h4>Top Spending</h4>
      <div class="sort-select">
        <v-select v-model="sortType" :options="sortOptions"  class="selectbudgettype">
        <template #option="option">
          <div class="selectedSortType"><span>{{option.name}}</span> <span class="material-symbols-outlined">{{ option.icon }}</span></div>
         </template>
       <template #selected-option="option">
        <span>{{option.name}}</span> <span class="material-symbols-outlined" style="padding-top: 1.5px;">{{ option.icon }}</span>
        </template>
      </v-select>
    </div>
      
      </div>
      <div v-if="budgetType=='Income'" class="topspending1" v-for="income in incomeArrayToSort.slice(0,3)">
      <div  class="topspendingname">
           <img src="/moneyup.png"></img>
           <div class="topspendingtext">
            <span>{{income.name}}</span>
            <span id="transactiondate" v-if="income.date==currentDate">Today</span>
            <span id="transactiondate" v-else-if="income.date==yesterdayDate">Yesterday</span>
            <span id="transactiondate" v-else>{{ income.date}}</span>
           </div>
      </div>
      <span  style="color:green">{{ new Intl.NumberFormat("us-en",{style:"currency",currency:"usd"}).format(income.amount) }}</span>
    </div>
    <div v-if="budgetType=='Expense'" class="topspending1" v-for="expense in expenseArrayToSort.slice(0,3)">
      <div  class="topspendingname">
           <img src="/moneydown.png"></img>
           <div class="topspendingtext">
            <span>{{expense.name}}</span>
            <span id="transactiondate" v-if="expense.date==currentDate">Today</span>
            <span id="transactiondate" v-else-if="expense.date==yesterdayDate">Yesterday</span>
            <span id="transactiondate" v-else>{{ expense.date }}</span>
           </div>
      </div>
      <span  style="color:red">{{ new Intl.NumberFormat("us-en",{style:"currency",currency:"usd"},).format(expense.amount) }}</span>
    </div>
    </div>
    <div v-if="isMenu" class="menu">
    <div class="menu-nav">
    <h3>Expense</h3>
    <button @click="goToMenu"><span id="menu-icon" class="material-symbols-outlined">close</span></button>
</div>
     <div class="menu-links">
        <h3  :class="{dashboardLinkhover:isActiveLink('/stats')}"><RouterLink to="/dashboard">DASHBOARD</RouterLink></h3>
        <h3   :class="{dashboardLink:isActiveLink('/stats')}"><RouterLink to="/stats">STATISTICS</RouterLink></h3>
        <h3 :class="{dashboardLinkhover:isActiveLink('/stats')}"><RouterLink to="/wallet">WALLET</RouterLink></h3>
     </div>
</div>
    </div>
</template>
