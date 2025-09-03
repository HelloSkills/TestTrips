<template>
  <div :class="$style.container">
    <div :class="$style.wrapper">

      <div :class="$style.ticketInfo">
        <div
            :class="[$style.skeleton, $style.name]"
            style="--delay: 0.1s"
        ></div>

        <div :class="$style.dateTime">
          <div :class="$style.dateFrom">
            <div
                :class="[$style.skeleton, $style.time]"
                style="--delay: 0.2s"
            ></div>
            <div
                :class="[$style.skeleton, $style.date]"
                style="--delay: 0.3s"
            ></div>
          </div>

          <div :class="$style.cityInfo">
            <div :class="$style.cities">
              <div
                  :class="[$style.skeleton, $style.cityFrom]"
                  style="--delay: 0.4s"
              ></div>
              <div
                  :class="[$style.skeleton, $style.cityTo]"
                  style="--delay: 0.5s"
              ></div>
            </div>
            <div
                :class="[$style.skeleton, $style.line]"
                style="--delay: 0.6s"
            ></div>
            <div :class="$style.iata">
              <div
                  :class="[$style.skeleton, $style.iataFrom]"
                  style="--delay: 0.7s"
              ></div>
              <div
                  :class="[$style.skeleton, $style.iataTo]"
                  style="--delay: 0.8s"
              ></div>
            </div>
          </div>

          <div :class="$style.dateTo">
            <div
                :class="[$style.skeleton, $style.time]"
                style="--delay: 0.9s"
            ></div>
            <div
                :class="[$style.skeleton, $style.date]"
                style="--delay: 1.0s"
            ></div>
          </div>
        </div>
      </div>

      <div :class="$style.booking">
        <div
            :class="[$style.skeleton, $style.bookBtn]"
            style="--delay: 1.1s"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  width: 840px;
  height: 200px;
  background-color: var(--color-white);
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

.cities {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.iata {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.booking {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}

/* Размеры под реальные блоки */
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

.skeleton {
  background: linear-gradient(
          90deg,
          #e0e0e0 25%,
          #f8f8f8 50%,
          #e0e0e0 75%
  );
  background-size: 250% 100%;
  border-radius: 4px;

  /* Переливание и пульсация */
  animation: shimmer 1.2s linear infinite, pulse 2s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  animation-fill-mode: both; /* плавный старт */
}

/* Переливание градиента */
@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
}

/* Лёгкая пульсация */
@keyframes pulse {
  0%, 100% { opacity: 0.6; filter: brightness(0.95); }
  50% { opacity: 1; filter: brightness(1.05); }
}
</style>