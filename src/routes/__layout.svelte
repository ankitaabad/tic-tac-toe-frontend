<div class="container">
    <div class="center">

        <slot />
    </div>
</div>

<style>
    .container {
  height: 100vh;
  max-width:600px;
  margin:auto;
  position: relative;
 
  display:flex;
  flex-direction: column;
  justify-content: center;

}

.center {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
}
</style>

