<script setup>
import { ref} from 'vue';
import { RouterLink,useRoute,useRouter } from 'vue-router';
let goToRoute=useRouter();
let isActiveLink = (routePath)=>{
  const route = useRoute();
  return route.path===routePath;
}
let enableQuestion=(question)=>{
  isQuestionNumber.is
}
let goToDashboard=()=>{
  goToRoute.push('/dashboard');
}
</script>

<template>
      <div class="nav">
    <h3 id="logo"> <RouterLink to="/">Suprence</RouterLink></h3>
     <h3 :class="{hoverEffect:isActiveLink('/contact')}"><RouterLink to="/">Home</RouterLink> </h3>
    <h3 :class="{hoverEffect:isActiveLink('/contact')}"><RouterLink to="/about">About</RouterLink></h3>
    <h3 :class="{homeEffect:isActiveLink('/contact')}"><RouterLink to="/contact">Contact Us</RouterLink></h3>
    <button @click="goToDashboard();">START NOW !</button>
  </div>
  <div class="contact-hero">
    <h1>get in touch</h1>
    <h4>want to reach us directly</h4>
    <div class="contactHeroInfo"> 
        <img src="/logo.png"></img>
    <h4>aness.abdelfattah</h4></div>
   
  </div>
  <div class="contact-faq">
     <h1>FAQ</h1>
     <div class="faq-list">
        <div class="faq-item"><span id="faq-question" >What does this expense tracker do?</span><span v-if="switchQuestion==0" class="material-symbols-outlined" @click="enableQuestion(1)">add</span><span v-if="switchQuestion==1" class="material-symbols-outlined" @click="enableQuestion(0)">remove</span></div>
        <p v-if="switchQuestion==1">It helps you record your income, track your spending, and visualize where your money goes.</p>
        <div class="faq-item"><span id="faq-question" >Do I need to create an account?</span><span v-if="switchQuestion==0"  class="material-symbols-outlined" @click="enableQuestion(2)">add</span><span v-if="switchQuestion==2" class="material-symbols-outlined" @click="enableQuestion(0)">remove</span></div>
        <p v-if="switchQuestion==2">Nope! You can start tracking immediately. Your data stays local unless you choose to save it somewhere else.</p>
        <div class="faq-item"><span id="faq-question" >Is it really free?</span><span v-if="switchQuestion==0"  class="material-symbols-outlined" @click="enableQuestion(3)">add</span><span v-if="switchQuestion==3" class="material-symbols-outlined" @click="enableQuestion(0)">remove</span></div>
        <p v-if="switchQuestion==3">Yes—no subscriptions, no hidden fees.</p>
        <div class="faq-item"><span id="faq-question" >I overspent… can the app help me?</span><span v-if="switchQuestion==0"  class="material-symbols-outlined" @click="enableQuestion(4)">add</span><span v-if="switchQuestion==4" class="material-symbols-outlined" @click="enableQuestion(0)">remove</span></div>
        <p v-if="switchQuestion==4">We’ve all been there! Check your charts to spot where most of your money goes, then set a budget to stay on track.</p>
        <div class="faq-item"><span id="faq-question">Does this app make me richer?</span><span v-if="switchQuestion==0"  class="material-symbols-outlined" @click="enableQuestion(5)">add</span><span v-if="switchQuestion==5" class="material-symbols-outlined" @click="enableQuestion(0)">remove</span></div>
        <p v-if="switchQuestion==5">We can't print money 😆 but we’ll help you keep more of it!</p>
     </div>
  </div>
  <div class="footer">
    <div class="footer-header">
      <h3>Expense</h3>
    <img src="/social.png">
  </div>
  <div class="footer-menu">
    <h3 id="fmenu">MENU</h3>
    <h3 :class="{footerLinkHover:isActiveLink('/contact')}"><RouterLink to="/">Home</RouterLink> </h3>
    <h3 :class="{footerLinkHover:isActiveLink('/contact')}"><RouterLink to="/about">About</RouterLink></h3>
    <h3 :class="{footerLink:isActiveLink('/contact')}"><RouterLink to="/contact">Contact Us</RouterLink></h3>
    <div class="menu-border">
      <h3>Use Expense Now</h3>
      <button @click="goToDashboard();">START NOW !</button>
    </div>

  </div>
    
  </div>
</template>