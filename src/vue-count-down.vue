<template>
  <span>
    <slot
      :day="time.day"
      :hour="time.hour"
      :minute="time.minute"
      :second="time.second"
      :restCount="restCount">
      <template v-if="restCount>0">
        <template v-if="model==='timer'">{{time.day}}天{{time.hour}}时{{time.minute}}分{{time.second}}秒</template>
        <template v-else>{{restCount}}</template>
      </template>
      <template v-else></template>
    </slot>
  </span>
</template>
<script>
  export default {
    data() {
      return {
        endTimestamp: 0,				//活动结束时间
        timer: null,
        restCount: 0,
        time: {
          day: 0,
          hour: 0,
          minute: 0,
          second: 0,
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
            this.restart()
          }
        }
      },
      count: {
        immediate: true,
        handler(val) {
          if (val > 0) {
            this.restart(val)
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
          let rest = that.model === 'timer' ? this.getRestTime() : --this.restCount;
          if (rest < 0) {
            that.$emit('ended');
            //同步更新父组件的值，使用方法：v-bind:count.sync="anyValueKey"
            that.$emit('update:count', 0)
          } else {
            that.triggerTimer()
          }
        }, this.stepTime)
      },

      render() {
        let data = {};

        if (this.model === 'timer') {
          let rest = this.getRestTime();
          this.time.day = this.formatNumber(Math.floor(rest / 86400));
          this.time.hour = this.formatNumber(Math.floor((rest % 86400) / 3600));
          this.time.minute = this.formatNumber(Math.floor((rest % 3600) / 60));
          this.time.second = this.formatNumber(Math.floor((rest % 60)));
          this.restCount = rest;
          data = {
            day: this.time.day,
            hour: this.time.hour,
            minute: this.time.minute,
            second: this.time.second,
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
      restart(count) {

        this.clearTimer();
        if (this.model === 'timer') {
          if (count > 0) {
            this.endTimestamp = Date.now() + count * 1000;
            this.triggerTimer();
          } else if (this.count > 0) {
            this.endTimestamp = Date.now() + this.count * 1000;
            this.triggerTimer();
          } else if (this.endTime) {
            this.endTimestamp = this.parseDate(this.endTime);
            if (this.endTimestamp) {
              this.triggerTimer();
            }
          }
        } else {
          if (count > 0) {
            this.restCount = count;
            this.triggerTimer();
          } else if (this.count > 0) {
            this.restCount = this.count;
            this.triggerTimer();
          }
        }
      }
    }
  }
</script>
