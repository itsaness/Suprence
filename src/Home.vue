<script setup>
import { RouterLink,useRoute,useRouter } from 'vue-router';
let goToRoute=useRouter();
let isActiveLink = (routePath)=>{
  const route = useRoute();
  return route.path===routePath;
}
let goToDashboard=()=>{
  goToRoute.push('/dashboard');
}
</script>
<template>
    <div class="nav">
    <h3 id="logo"> <RouterLink to="/">Suprence</RouterLink></h3>
    <h3 :class="{homeEffect:isActiveLink('/')}"><RouterLink to="/">Home</RouterLink> </h3>
    <h3 :class="{hoverEffect:isActiveLink('/')}"><RouterLink to="/about">About</RouterLink></h3>
    <h3 :class="{hoverEffect:isActiveLink('/')}"><RouterLink to="/contact">Contact Us</RouterLink></h3>
    <button @click="goToDashboard();"> START NOW !</button>
  </div>
  <div class="hero">
    <div class="hero-text">
    <h1>With Expense
    <span id="hero-lose">never lose</span>
    track of your money !</h1>
    <button @click="goToDashboard();">START NOW !</button>
    
  </div>
  <div class="hero-img"><img src="/laptop.png"></img></div>
  </div>
  <div class="footer">
    <div class="footer-header">
      <h3>Expense</h3>
    <img src="/social.png">
  </div>
  <div class="footer-menu">
    <h3 id="fmenu">MENU</h3>
    <h3 :class="{footerLink:isActiveLink('/')}"><RouterLink to="/">Home</RouterLink> </h3>
    <h3 :class="{footerLinkHover:isActiveLink('/')}"><RouterLink to="/about">About</RouterLink></h3>
    <h3 :class="{footerLinkHover:isActiveLink('/')}"><RouterLink to="/contact">Contact Us</RouterLink></h3>
    <div class="menu-border">
      <h3>Use Expense Now</h3>
      <button @click="goToDashboard();"> START NOW !</button>
    </div>

  </div>
    
  </div>
</template>