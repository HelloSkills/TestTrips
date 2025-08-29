<template>
  <div :class="$style.container">
    <div :class="$style.wrapper">
      <div :class="$style.ticketInfo">
        <div :class="$style.name">
          Перевозчик {{ }}
        </div>
        <div :class="$style.dateTime">
          <div :class="$style.dateFrom">
            <div :class="$style.time">
              6:35
            </div>
            <div :class="$style.date">
              26.08
            </div>
          </div>

          <div :class="$style.cityInfo">
            <div :class="$style.cities">
              <div :class="$style.cityFrom">
                Сочи
              </div>
              <div :class="$style.cityTo">
                Москва
              </div>
            </div>
            <div :class="$style.line"></div>
            <div :class="$style.iata">
              <div :class="$style.iataFrom">
                AER
              </div>
              <div :class="$style.iataTo">
                DME
              </div>
            </div>
          </div>
          <div :class="$style.dateTo">
            <div :class="$style.time">
              10:22
            </div>
            <div :class="$style.date">
              27.08
            </div>
          </div>
        </div>
      </div>

      <div :class="$style.booking">
        <div :class="$style.bookBtn">
          Забронировать от {{  }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" module>
.container {
  width: 840px;
  height: 200px;
  background-color: #FFFFFF;
  border-radius: 10px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.ticketInfo {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #cbd1da;
}

.name {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
}

.dateTime {
  display: flex;
  align-items: center;
  gap: 40px;
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

.cityFrom, .cityTo {
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
}

.cities, .iata {
  display: flex;
  justify-content: space-between;
}

.iata {
  color: #4361EE;
  font-weight: 700;
}

.time {
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
}

.date {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
}

.line {
  width: 580px;
  height: 5px;
  background-color: #B3C1D1;
  border-radius: 5px;
}

.booking {
  display: flex;
  justify-content: end;
  margin-top: 20px;
  cursor: pointer;
}

.bookBtn {
  color: #FFFFFF;
  background-color: #4361EE;
  width: 239px;
  height: 40px;
  border-radius: 5px;
  padding: 12px 30px;
  font-weight: 400;
  font-size: 14px;
}
</style>