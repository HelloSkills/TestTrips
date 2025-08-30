<template>
  <div :class="$style.container">
    <div :class="$style.wrapper">

      <!-- Заголовок -->
      <div :class="$style.ticketInfo">
        <div :class="[$style.skeleton, $style.name]"></div>

        <div :class="$style.dateTime">
          <!-- Левая дата -->
          <div :class="$style.dateFrom">
            <div :class="[$style.skeleton, $style.time]"></div>
            <div :class="[$style.skeleton, $style.date]"></div>
          </div>

          <!-- Центральный блок -->
          <div :class="$style.cityInfo">
            <div class="$style.cities">
              <div :class="[$style.skeleton, $style.cityFrom]"></div>
              <div :class="[$style.skeleton, $style.cityTo]"></div>
            </div>
            <div :class="[$style.skeleton, $style.line]"></div>
            <div class="$style.iata">
              <div :class="[$style.skeleton, $style.iataFrom]"></div>
              <div :class="[$style.skeleton, $style.iataTo]"></div>
            </div>
          </div>

          <!-- Правая дата -->
          <div :class="$style.dateTo">
            <div :class="[$style.skeleton, $style.time]"></div>
            <div :class="[$style.skeleton, $style.date]"></div>
          </div>
        </div>
      </div>

      <!-- Бронь -->
      <div :class="$style.booking">
        <div :class="[$style.skeleton, $style.bookBtn]"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  width: 840px;
  height: 200px;
  background-color: #FFFFFF;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
}

.wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.ticketInfo {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e5e7eb;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
}

.dateTime {
  display: flex;
  align-items: center;
  gap: 50px;
  margin: 15px 0 20px;
}

.dateFrom, .dateTo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cityInfo {
  width: 580px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.booking {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e4e4e4 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

/* размеры под реальные блоки */
.name {
  width: 200px;
  height: 16px;
}

.time {
  width: 60px;
  height: 20px;
}

.date {
  width: 80px;
  height: 14px;
}

.cityFrom, .cityTo {
  width: 100px;
  height: 16px;
}

.line {
  width: 100%;
  height: 5px;
}

.iataFrom, .iataTo {
  width: 50px;
  height: 16px;
}

.bookBtn {
  width: 250px;
  height: 40px;
  border-radius: 5px;
}

@keyframes shimmer {
  0% { background-position: -200% 0 }
  100% { background-position: 200% 0 }
}
</style>
