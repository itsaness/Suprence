import { defineStore } from "pinia";
import { ref } from "vue";
 export const  modifyBudget = defineStore('budget',()=>{
    let income = ref([]);
    let expense=ref([]);
    let addIncome=(name,amount,date)=>{
        income.value.push({
            name,
            amount,
            date,
        });
    };
     let addExpense=(name,amount,date)=>{
        expense.value.push({
            name,
            amount,
            date,
        });
    };
    return {income,expense,addIncome,addExpense};
},
{
        persist:true,
    },
)