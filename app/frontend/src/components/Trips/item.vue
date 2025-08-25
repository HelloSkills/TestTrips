<template>
  <div :class="$style.container">
    <div :class="$style.wrap">
      <div :class="$style.info">
        <div :class="$style.date">Тут дата</div>
        <div :class="$style.price">Тут цена</div>
      </div>
      <div :class="$style.nameTravel">
        Тут название поездки
      </div>
    </div>
    <div :class="[$style.wrapItem]">
      <div :class="$style.ticketInfo">
        <div :class="$style.ticketWrap">
          <img src="/icons/air.svg" alt="avia_icon" width="14" height="14">
          <div :class="$style.price">тут ценник ₽</div>
          <div :class="$style.fromTo">Откуда ➝ Куда</div>
        </div>
      </div>
      <div :class="$style.name">Имя</div>
    </div>
    <div :class="$style.toTravel"><a>Перейти к поездке ➝</a></div>



  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" module>
.container {
  width: 840px;
  height: max-content;
  margin-top: 30px;
  background-color: #FFFFFF;
  //padding: 0 20px;
  border-radius: 10px;
}

.wrap {
  padding: 0 20px 20px;
  border-bottom: 1px solid #DDE2EB;
}

.wrapItem {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #F6F8FC;
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
}
.info {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
}

.date {
  color: #B3C1D1;
}

.price {
  color: #4361EE;
}

.name {
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
}

.nameTravel {
  padding-top: 10px;
}

.ticketInfo {
  display: flex;
}

.ticketWrap {
  display: flex;
  gap: 5px;
  height: 14px;
}

.toTravel {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #DDE2EB;
}
</style>