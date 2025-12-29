<script setup>
    import { ref,onMounted } from 'vue';
    import { computed } from 'vue';
   import { RouterLink,useRoute } from 'vue-router'; 
   import { modifyBudget } from './store';
   import vSelect from 'vue-select';
   import { FileUpload } from 'primevue';
   import 'vue-select/dist/vue-select.css';
   let imageUpload=ref("");
   let profileName=ref("");
   let profileTag=ref("");
   let displayProfileName=ref("Guest");
   let budget = modifyBudget();
   let totalBudget = ref(0);
   let totalIncome = ref(0);
   let totalExpense=ref(0);
   let joinedBudget=ref([]);
   let isMenu=ref(false);
   let isImgHovering=ref(false);
   let isProfile=ref(false);
   let isTransactions=ref(false);
   let budgetType=ref("Income");
   let sortOptions=ref("");
   let currentDate=ref(new Intl.DateTimeFormat("en-us",{month: "short", day: "numeric", year: "numeric",}).format(new Date()));
   let yesterdayDate=ref(new Date());
   yesterdayDate.value.setDate(yesterdayDate.value.getDate()-1);
   yesterdayDate.value=new Intl.DateTimeFormat("en-us",{month: "short", day: "numeric", year: "numeric",}).format(yesterdayDate.value);
   let sortedIncome=computed(()=>{
    switch(sortOptions.value){
        case "Lowest Price":
            return budget.income.sort((a,b)=>a.amount-b.amount);

        case "Highest Price":
            return budget.income.sort((a,b)=>b.amount-a.amount);
    
        case "Oldest":
            return budget.income.sort((a,b)=>new Date(a.date)-new Date(b.date));
 
        case "Recent":
            return budget.income.sort((a,b)=>new Date(b.date)-new Date(a.date));

        default:
            return budget.income;
    }
   });
   let sortedExpense=computed(()=>{
    switch(sortOptions.value){
        case "Lowest Price":
            return budget.expense.sort((a,b)=>b.amount-a.amount);

        case "Highest Price":
            return budget.expense.sort((a,b)=>a.amount-b.amount);
    
        case "Oldest":
            return budget.expense.sort((a,b)=>new Date(a.date)-new Date(b.date));
 
        case "Recent":
            return budget.expense.sort((a,b)=>new Date(b.date)-new Date(a.date));

        default:
            return budget.expense;
    }
   });
   let isActiveLink=(routePath)=>{
       const route=useRoute();
       return route.path==routePath;
   }
    let goToMenu=()=>{
    isMenu.value=!isMenu.value;
   }
   let goToProfile=()=>{
    isProfile.value=!isProfile.value;
   }
   let goToTransactions=()=>{
    isTransactions.value=!isTransactions.value;
   }
   let validateProfile=()=>{
     if(profileName.value!=""){
        displayProfileName.value=profileName.value;
     }
     profileName.value="";
     profileTag.value="";
     saveProfile();
     
   } 
   for(let i=0;i<budget.income.length;i++){
    totalIncome.value+=Number(budget.income[i].amount);
   }
   for(let i=0;i<budget.expense.length;i++){
    totalExpense.value+=Number(budget.expense[i].amount);
   }
   totalBudget.value=totalIncome.value+totalExpense.value;
   totalIncome.value=new Intl.NumberFormat("en-us",{style:"currency",currency:"USD"}).format(totalIncome.value)
   totalExpense.value= new Intl.NumberFormat("en-us",{style:"currency",currency:"USD"}).format(totalExpense.value);
   totalBudget.value=new Intl.NumberFormat("en-us",{style:"currency",currency:"USD"}).format(totalBudget.value);
   joinedBudget = computed(()=>{
    return[
    ...budget.income,
    ...budget.expense,
    ];
     }
    );
    joinedBudget.value.sort((a,b)=>b.date-a.date);
      let saveProfile=()=>{
    localStorage.setItem("savedProfile",JSON.stringify(displayProfileName.value ));
   }
   let saveBudget=()=>{
    localStorage.setItem("savedBudget",JSON.stringify({
        budget:totalBudget.value,
        income:totalIncome.value,
        expense:totalExpense.value,
    }     ));
 }
   onMounted(()=>{
    let savedProfile=localStorage.getItem("savedProfile");
    if(savedProfile){
        let parsedProfile=JSON.parse(savedProfile);
        displayProfileName.value=parsedProfile;
    }}
   )

  
    

</script>
<template>
    <div class="dashboard-body">
        <div class="dashboard-nav">
<div class="dashboard-profile">
    <img  src="/profilepic.png" alt="togglePorfile" role="button" @click="goToProfile"></img>
      <div class="dashboard-profile-text">
        <span id="name" >Hi {{displayProfileName}}!</span>
        <span id="welcome" >Welcome</span>   
      </div>
</div>
<button @click="goToMenu"><span id="menu-icon" class="material-symbols-outlined">menu</span></button>
</div>
<div class="dashboardcard">
     <div class="balance-text"><span>YOUR BALANCE</span><span id="visibility-icon" class="material-symbols-outlined">visibility</span></div>
     <div class="balance"> <span >{{totalBudget}}</span></div>
     <div class="dashboard-inout">
        <div class="dashboard-income">
            <span id="arrow" class="material-symbols-outlined">arrow_circle_up</span><span>Income</span>
            <span id="inoutbalance" style="color:green;">{{ totalIncome }}</span>
        </div>
        <div class="dashboard-expense">
            <span id="arrow" class="material-symbols-outlined">arrow_circle_down</span><span>Expense</span>
            <span id="inoutbalance" style="color:red;">{{totalExpense}}</span>
        </div>

     </div>
</div>
 <div class="dashboard-transaction-history">
    <div class="dashboard-transaction-title">
        <span id="name">Transaction History</span>
    <span id="see-all-button" @click="goToTransactions">See All</span>
    </div>
    <div class="dashboard-transaction1" v-for="joinedBudget  in joinedBudget.slice(0,4)">
        <div class="dashboard-transaction-name">
         <img v-show="Number(joinedBudget.amount)<0" src="/moneydown.png"></img>
         <img v-show="Number(joinedBudget.amount)>0" src="/moneyup.png"></img>
         <div class="dashboard-transaction-text">
            <span>{{joinedBudget.name}}</span>
            <span id="transactiondate" v-if="joinedBudget.date==currentDate">Today</span>
             <span id="transactiondate" v-else-if="joinedBudget.date==yesterdayDate">Yesterday</span>
         <span v-else id="transactiondate">{{joinedBudget.date}}</span></div>
         </div>
         <span v-show="Number(joinedBudget.amount)<0" style="color:red"> {{new Intl.NumberFormat("en-us",{style:"currency",currency:"USD"}).format(joinedBudget.amount)}}</span>
         <span v-show="Number(joinedBudget.amount)>0" style="color:green">{{ new Intl.NumberFormat("en-us",{style:"currency",currency:"USD"}).format(joinedBudget.amount) }}</span>
    </div>
</div>
<div v-if="isMenu" class="menu">
    <div class="menu-nav">
    <h3>Suprence</h3>
    <button @click="goToMenu"><span id="menu-icon" class="material-symbols-outlined">close</span></button>
</div>
     <div class="menu-links">
        <h3  :class="{dashboardLink:isActiveLink('/dashboard')}"><RouterLink to="/dashboard">DASHBOARD</RouterLink></h3>
        <h3   :class="{dashboardLinkhover:isActiveLink('/dashboard')}"><RouterLink to="/stats">STATISTICS</RouterLink></h3>
        <h3 :class="{dashboardLinkhover:isActiveLink('/dashboard')}"><RouterLink to="/wallet">WALLET</RouterLink></h3>
     </div>
</div>
<div v-show="isProfile" class="profile">
    <div class="profile-nav">
    <img class="profile-img" src="/profilepic.png" alt="togglePorfile" role="button" @mouseenter="isImgHovering=true" @mouseleave="isImgHovering=false"></img>
    <button @click="goToProfile" class="material-symbols-outlined">close</button>
    </div>
     <div class="profile-input">
     <label id="userlabel" for="username">DISPLAY NAME</label>
     <input v-model="profileName" id="username" for="username" name="USERNAME">
     <label  id="taglabel" for="tag">USERNAME</label>
     <input v-model="profileTag" id="tag" for="tag">
     <FileUpload ref="imageUpload" mode="basic" />
     <button id="wallet-btn" @click="upload,validateProfile();">Apply</button>
     </div>
</div>
<div v-if="isTransactions" class="transactions">
    <button @click="goToTransactions" class="material-symbols-outlined">close</button>
    <div  class="transactions-select"><v-select v-model="budgetType" :options="['Income','Expense']" class="selectbudgettype" ></v-select></div>
    <div class="transactions-sort-btn"><span style="font-weight:800;">Sort by:</span><v-select v-model="sortOptions" :options="['Lowest Price','Highest Price','Recent','Oldest']" class="selectbudgettype"></v-select></div>
    <div class="transactions-list">
    <div v-if="budgetType=='Income'" class="dashboard-transaction1" v-for="income in sortedIncome">
        <div class="dashboard-transaction-name">
         <img  src="/moneyup.png"></img>
         <div class="dashboard-transaction-text">
            <span>{{income.name}}</span>
         <span v-if="income.date==currentDate" id="transactiondate">Today</span>
         <span v-else-if="income.date==yesterdayDate" id="transactiondate">Yesterday</span>
         <span v-else id="transactiondate">{{income.date}}</span></div>
         </div>
         <span  style="color:green">{{ new Intl.NumberFormat("en-us",{style:"currency",currency:"USD"}).format(income.amount) }}</span>
    </div>
    <div v-if="budgetType=='Expense'" class="dashboard-transaction1" v-for="expense in sortedExpense">
        <div class="dashboard-transaction-name">
         <img  src="/moneydown.png"></img>
         <div class="dashboard-transaction-text">
            <span>{{expense.name}}</span>
        <span v-if="expense.date==currentDate" id="transactiondate">Today</span>
        <span v-else-if="expense.date==currentDate" id="transactiondate">Yesterday</span>
         <span v-else id="transactiondate">{{expense.date}}</span></div>
         </div>
         <span  style="color:red">{{ new Intl.NumberFormat("en-us",{style:"currency",currency:"USD"}).format(expense.amount) }}</span>
    </div>
    </div>
</div>
</div>


</template>