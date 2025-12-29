<script setup>
import { ref } from "vue";
import { computed } from "vue";
import vSelect from "vue-select";
import { useRoute, RouterLink } from "vue-router";
import { modifyBudget } from "@/store";
let walletType = ref("Income");
let isMenu = ref(false);
let budget = modifyBudget();
let budgetName = ref("");
let budgetAmount = ref("");
let budgetDate = ref("");
let isAnimation = ref(false);
let enableAnimation = () => {
  isAnimation.value = true;
  setTimeout(() => {
    isAnimation.value = false;
  }, 820);
};
let formattedDate = computed(() => {
  if (!budgetDate.value) return "";
  let date = new Date(budgetDate.value);
  return Intl.DateTimeFormat("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
});
let updateBudget = () => {
  budgetName.value =
    budgetName.value.charAt(0).toUpperCase() + budgetName.value.slice(1);
  if (walletType.value == "Income") {
    budget.addIncome(budgetName.value, budgetAmount.value, formattedDate.value);
  } else if (walletType.value == "Expense") {
    budget.addExpense(
      budgetName.value,
      -budgetAmount.value,
      formattedDate.value
    );
  }
  validateBudget();
  enableAnimation();
};
let goToMenu = () => {
  isMenu.value = !isMenu.value;
};
let validateBudget = () => {
  budgetName.value = "";
  budgetAmount.value = "";
  budgetDate.value = "";
};
let showButton=computed(()=>{
  if(budgetName.value == ""|| budgetAmount.value == ""||budgetDate.value == ""){
    return false;
  }else{
    return true;
  }

});
let isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path == routePath;
};
</script>
<template>
  <div class="dashboard-body">
    <div class="dashboard-nav">
      <div></div>
      <button @click="goToMenu">
        <span id="menu-btn" class="material-symbols-outlined">menu</span>
      </button>
      <div class="wallet-hero">
        <div class="wallet-hero-content">
          <v-select
            v-model="walletType"
            :options="['Income', 'Expense']"
            class="selectbudgettype"
          ></v-select>
        </div>
        <div class="profile-input">
          
            <label id="wallet-name" for="budgetName">NAME</label>
          <input
            v-model="budgetName"
            id="username"
            for="budgetName"
            name="USERNAME"
            required/>
          <label id="wallet-amount" for="amount">AMOUNT</label>
          <input v-model="budgetAmount" id="amount" for="amount" />
          <label id="wallet-date" for="date">DATE</label>
          <input v-model="budgetDate" id="date" for="date" type="date"/>
          <div :class="{ animated: isAnimation }">
            <button v-if="showButton" @click="updateBudget()" type="submit">Apply</button
            ><span v-if="isAnimation" style="color: green;">   Added Successfully !</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isMenu" class="menu">
      <div class="menu-nav">
        <h3>Expense</h3>
        <button @click="goToMenu">
          <span id="menu-icon" class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="menu-links">
        <h3 :class="{ dashboardLinkhover: isActiveLink('/wallet') }">
          <RouterLink to="/dashboard">DASHBOARD</RouterLink>
        </h3>
        <h3 :class="{ dashboardLinkhover: isActiveLink('/wallet') }">
          <RouterLink to="/stats">STATISTICS</RouterLink>
        </h3>
        <h3 :class="{ dashboardLink: isActiveLink('/wallet') }">
          <RouterLink to="/wallet">WALLET</RouterLink>
        </h3>
      </div>
    </div>
  </div>
</template>
