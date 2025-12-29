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
    <h3 :class="{hoverEffect:isActiveLink('/about')}"><RouterLink to="/">Home</RouterLink> </h3>
    <h3 :class="{homeEffect:isActiveLink('/about')}"><RouterLink to="/about">About</RouterLink></h3>
    <h3 :class="{hoverEffect:isActiveLink('/about')}"><RouterLink to="/contact">Contact Us</RouterLink></h3>
    <button @click="goToDashboard();">START NOW !</button>
  </div>
  <div class="about-hero">
    <h1>About Suprence</h1>
    <p>Suprence helps you track expenses, manage budgets, and understand your spending with ease.</p>
      <p>We simplify personal finance through clear insights and smart tools to help you save more and spend wisely.</p> 
      <p>Take control of your money—anytime, anywhere.</p>
  </div>
  <div class="about-card-title">
    <h2>What drives Suprence?</h2>
    <p>Suprence is driven by the belief that managing money
    <span id="about-card-title-text">should be simple, insightful, and empowering</span></p>
  </div>
  <div class="about-cards">
    <div class="card1">
      <img src="/open-source.png"></img>
      <div class="card1-text">
        <h4>Secure & Private</h4>
      <p>Built with transparency in mind,</p>
      <p>so you can see how your data is handled and </p>
      <p>even contribute to improving the app.</p>
      </div>
      

  </div>
  <div class="card2">
      <img src="/personal-data.png"></img>
      <div class="card2-text">
      <h4>Open Source & Transparent</h4>
      <p>Your financial information is safe with us, </p>
      <p>with strong encryption and</p>
      <p>strict privacy controls.</p>
      </div>
      

  </div>
  <div class="card3">
      <img src="/easy-to-use.png"></img>
      <div class="card3-text">
        <h4>Easy & Intuitive</h4>
      <p>Track expenses and manage your budget </p>
      <p>effortlessly with a clean,</p>
       <p>user-friendly interface.</p>
      </div>
      

  </div>
  </div>
  <div class="footer">
    <div class="footer-header">
      <h3>Suprence</h3>
    <img src="/social.png">
  </div>
  <div class="footer-menu">
    <h3 id="fmenu">MENU</h3>
    <h3 :class="{footerLinkHover:isActiveLink('/about')}"><RouterLink to="/">Home</RouterLink> </h3>
    <h3 :class="{footerLink:isActiveLink('/about')}"><RouterLink to="/about">About</RouterLink></h3>
    <h3 :class="{footerLinkHover:isActiveLink('/about')}"><RouterLink to="/contact">Contact Us</RouterLink></h3>
    <div class="menu-border">
      <h3>Use Suprence Now</h3>
      <button @click="goToDashboard();">START NOW !</button>
    </div>

  </div>
    
  </div>

  
  
</template>