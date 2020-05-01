<template>
<div class="about container-fluid">
  <div class="jumbotron text-center text-dark d-flex justify-content-center p-0 my-5">
    <div class="content d-flex flex-column justify-content-center py-2">
        <p>你的世界是否<br>偶爾被烏雲籠罩<br>偶爾需要增添些許點綴</p><br>
        <p>不用逃避那些陰暗<br>當有一盞燈從暗中鑽出<br>黑暗成了最完美的陪襯</p><br>
        <p>願你在<span class="light px-1">#燈一下</span>找到屬於你的燈<br>在為你點亮生活的同時<br>也能引領你為自己發光：)<br></p>
        <p class="light text-right m-0">#燈一下</p>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.about {
  min-height: calc(100vh - 50px);
  padding-top: 76px;
}
.jumbotron {
  width: 100%;
  background-color: transparent;
  .content {
    width: 500px;
    height: auto;
    position: relative;
    p {
        font-size: 20px;
        font-weight: 500;
        line-height: 1.6;
        letter-spacing: .3rem;
    }
    .light {
        font-weight: 700;
    }
    &::before, &::after {
        content: '';
        width: 400px;
        height: 300px;
        border: 3px solid rgba(#e8e468, .5);
        position: absolute;
        z-index: -1;
    }
    &::before {
        left: 0;
        bottom: 0;
    }
    &::after {
        right: 0;
        top: 0;
    }
  }
}
</style>