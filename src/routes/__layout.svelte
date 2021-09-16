<div class="container">
    <div class="center">

        <slot />
    </div>
</div>

<style>
    .container {
  height: 500px;
  width:800px;
  position: relative;
  border: 3px solid green;
  display:flex;
  flex-direction: column;
  justify-content: center;

}

.center {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border:1px solid brown;
}
</style>

