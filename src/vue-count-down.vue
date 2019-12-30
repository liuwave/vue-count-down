<template>
  <span>
    <slot v-if="model==='timer'" :day="time.d" :hour="time.h" :minute="time.i" :second="time.s"
      :restSecond="time.rs">
      <template v-if="time.rs>0">
         {{time.d}}天{{time.h}}时{{time.i}}分{{time.s}}秒
      </template>
    </slot>
    <slot name="counter" v-else :restCount="restCount">
      <template v-if="restCount>0">{{restCount}}</template>
      <template v-else></template>
    </slot>
  </span>
</template>
<script>
  export default {
    name: 'count-down',
    data() {
      return {
        endTimestamp: 0,				//活动结束时间
        timer: null,
        restCount: 0,
        time: {
          d: 0,
          h: 0,
          i: 0,
          s: 0,
          rs: 0
        }
      }
    },
    props: {
      // 活动结束时间
      endTime: {
        type: [Number, Date, String]
      },
      count: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 1
      },
      model: {
        type: String,
        default: 'timer',//timer、counter
      }


    },
    beforeDestroy() {
      this.clearTimer()
    },
    watch: {
      endTime: {
        immediate: true,
        handler(val) {
          if (val) {
            this.endTimestamp = this.parseDate(this.endTime);
            if (this.endTimestamp && this.model==='timer') {
              this.triggerTimer();
            } else {
              this.clearTimer()
            }
          }
        }
      },
      count: {
        immediate: true,
        handler(val) {
          if (val > 0) {
            this.endTimestamp = Date.now() + val * 1000;
            this.restCount = val;
            this.clearTimer();
            this.triggerTimer();
          }
        }
      }
    },
    computed: {
      stepTime() {
        return this.model === 'timer' ? 1000 : Math.max(this.step, 1) * 1000
      }
    },
    methods: {

      parseDate(value) {

        if (typeof value === 'number' ||
          (typeof value === 'string' && value.indexOf('-') === -1)) {

          return parseInt(value.toString().length === 10 ? value * 1000 : value);

        } else if (typeof value === 'string') {
          return (new Date(value).getTime())
        } else if (typeof typeof value === 'object') {
          return value.getTime()
        }
        return false;
      },
      clearTimer() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
      },
      triggerTimer() {

        let that = this;
        this.render();
        this.timer = setTimeout(() => {
          let rest = that.model === 'timer' ? this.getRestTime() : this.restCount - 1;
          if (rest < 0) {
            that.$emit('ended');
          } else {
            this.restCount--;
            that.triggerTimer()
          }
        }, this.stepTime)
      },

      render() {
        let data = {};

        if (this.model === 'timer') {
          let rest = this.getRestTime();
          this.time.d = this.formatNumber(Math.floor(rest / 86400));
          this.time.h = this.formatNumber(Math.floor((rest % 86400) / 3600));
          this.time.i = this.formatNumber(Math.floor((rest % 3600) / 60));
          this.time.s = this.formatNumber(Math.floor((rest % 60)));
          this.time.rs = rest;
          data = {
            day: this.time.d,
            hour: this.time.h,
            minute: this.time.i,
            second: this.time.s,
            restSecond: rest,   // 剩余时间（秒）
          };
        } else {
          data = {
            restCount: this.restCount
          }
        }


        this.$nextTick(() => {
          this.$emit('update', data)
        });

      },

      formatNumber(value, paddingZero) {
        if (value < 10) {
          value = Math.max(value, 0);
          return paddingZero ? `0${value}` : value.toString();
        } else {
          return value.toString();
        }
      },
      getRestTime() {
        return Math.round((this.endTimestamp - Date.now()) / 1000);
      },
    }
  }
</script>
