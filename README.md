# vue-count-down

Vue2.X的倒数、倒计时组件,无依赖项，轻量级，轻松实现倒计数、倒计时，可以通过设置


Demo:[http://git.oldmen.cn/vue-count-down/index.html](http://git.oldmen.cn/vue-count-down/index.html)


[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/liuwave/vue-count-down)
[![npm](https://img.shields.io/npm/v/@liuwave/vue-count-down.svg)](https://www.npmjs.com/package/@liuwave/vue-count-down)
[![npm](https://img.shields.io/npm/dm/@liuwave/vue-count-down.svg)](https://npmcharts.com/compare/@liuwave/vue-count-down)
[![minified](https://badgen.net/bundlephobia/min/@liuwave/vue-count-down)](https://bundlephobia.com/result?p=@liuwave/vue-count-down)
[![gzip](https://badgen.net/bundlephobia/minzip/@liuwave/vue-count-down)](https://bundlephobia.com/result?p=@liuwave/vue-count-down)




# 安装

1. Node.js安装

    ```bash
    npm i @liuwave/vue-count-down --save
    ```
2. 浏览器引用

    ```html
    <!-- 需要先引入vue：<script src="https://cdn.jsdelivr.net/npm/vue"></script> -->
    <!--引入vue-count-down -->
        <script src="https://cdn.jsdelivr.net/npm/@liuwave/vue-count-down"></script>

    ```

# 注册组件
1. Node.js注册

    1. 全局注册

        ```javascript
        import Vue from 'vue'
        import vueCountDown from '@liuwave/vue-count-down'

        // 全局注册
        Vue.use(vueCountDown, { component: 'count-down' }) // 组件名默认是：vue-count-down
        // 或：Vue.component('count-down', vueCountDown)
        ```
    2. 局部注册

        ```javascript
        import vueCountDown from 'vue-count-down'

        export default {
          components: {
            // 局部注册
            'count-down': vueCountDown
          }
        }
        ```
2. 浏览器注册

    1. 全局注册

        ```html
        <!-- 需要先引入vue：<script src="https://cdn.jsdelivr.net/npm/vue"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/@liuwave/vue-count-down"></script>

        <script>
        // 全局注册
        Vue.use(vueCountDown, { component: 'count-down' }) // 组件名默认是：vue-count-down
        // 或：Vue.component('count-down', vueCountDown)
        </script>
        ```
    2. 局部注册

        ```html
        <!-- 需要先引入vue：<script src="https://cdn.jsdelivr.net/npm/vue"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/@liuwave/vue-count-down"></script>
        

        
        <script>
        new Vue({
          components: {
            // 局部注册
            'count-down': vueCountDown
          }
        })
        </script>
        ```
       
# 用法

1. 倒计时模式

    ```html
    <count-down :count="2000"  ></count-down>
    
    ```
    
    ```html
    <count-down 
    model="timer"
    end-time="2021-12-5"
    :count="2000"  >
    </count-down>
    ```
    > model 默认为 timer 
    > end-time 可以为 时间戳 、时间字符串(2020-19-25) 或者 Date对象
    > end-time 和 count 同时存在时，以count为准

   1. 属性
   
        | Property | Description                    |  type   | default |
        | -------- | ------------------------------ | :-----: | :-----: |
        | model    | 模式                            | String  |    timer    |
        | end-time | 结束时间                        | Number/String/Date  |    -    |
        | count    | 倒计时时间差（单位：秒）         | Number  |    0    |
    
   2. slot
   
    ```html
    
            <count-down  :count="3000" >
                <template v-slot="time">
                    自定义slot: 剩余时间 {{time.day}}天{{time.hour}}小时{{time.minute}}分{{time.second}}秒。。 总剩余秒数：{{time.restCount}}
    
                </template>
            </count-down>
     ```
2. 计数模式

    ```html
        <count-down  :count="5000" :step="1"  model="counter"></count-down>
    
        <count-down  :count="3000" :step="2"  model="counter"></count-down>
    
    ```
    
    1. 属性
    
        | Property      | Description                    |  type   | default |
        | ------------- | ------------------------------ | :-----: | :-----: |
        | model         | 模式                           | String  |    timer    |
        | step          | 计数间隔 （单位：秒）             | Number  |    1    |
        | count         | 计数数量         | Number  |    0    |
    
        > model 为 counter
    
    2.slot
    
        ```html
         <count-down  :count="55" :step="1"  model="counter">
                    <template v-slot="counter">
                        自定义slot： 还剩余{{counter.restCount}}
                    </template>
                </count-down>
        ```
        
# 事件

|  Name | Description                                          |
| :-----------: | ---------------------------------------------------- |
| v-on:ended   | 倒计时结束回调                                       |
| v-on:update:count| 倒计时结束回调  同步父组件的绑定值： v-bind:count.sync="anyValueKey"                                    |
| v-on:update  | 每次倒计时回调                                       |
    
> on-update 触发输出参数 
>> timer模式：{day: "0", hour: "0", minute: "0", second: "10", restCount: 10}
>
>> counter模式 ：{restCount:0}
>


``` html
    <p>
  设置的时间：{{timeLeft}}  <button v-if="timeLeft===0" @click="timeLeft=5;logList=[]">重设</button>
</p>
  <p>
  倒计时：
  <count-down  :count="10" @update="update" :count.sync="timeLeft" @ended="ended" >
    <template v-slot="time">{{time.restCount}}秒</template>
  </count-down>
  </p>
  
    输出：
    <ul>
      <li v-for="item in logList">{{item}}</li>
    </ul>

```
``` javascript
         methods: {
           ended () {
             console.log('done');
             this.logList.push('done');
           },
           update (data) {
             console.log('update', data)
             this.logList.push('update ,'+JSON.stringify(data));
           }
         }
```
```
        输出：
        update {day: "0", hour: "0", minute: "0", second: "10", restCount: 10}
        ....
        done
```

# 方法

#### restart(count)
> 参数 {Number} count 重设倒计数，可选

> 用法
  
```html
    restart演示 ：
    <count-down ref="countdown"  :count="10" >
    <template v-slot="time">{{time.restCount}}</template>
  </count-down>
    <button  @click="$refs.countdown.restart()">重设</button>
    <button  @click="$refs.countdown.restart(20)">重设为20</button>
```

