# vue-count-down

Vue2.X的倒数、倒计时组件 

#安装

1. Node.js安装

    ```bash
    npm i @liuwave/vue-count-down --save
    ```
2. 浏览器引用

    ```html
    <!-- 需要先引入vue：<script src="https://cdn.jsdelivr.net/npm/vue"></script> -->
    <!--引入vue-count-down -->
        <script src="dist/vue-count-down.min.js"></script>

    ```

# 注册组件
1. Node.js注册

    1. 全局注册

        ```javascript
        import Vue from 'vue'
        import vueCountDown from 'vue-count-down'

        // 全局注册
        Vue.use(vueCountDown, { component: 'count-down' }) // 组件名默认是：count-down
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
        <script src="/dist/vue-count-down.min.js"></script>

        <script>
        // 全局注册
        Vue.use(vueCountDown, { component: 'count-down' }) // 组件名默认是：count-down
        // 或：Vue.component('count-down', vueCountDown)
        </script>
        ```
    2. 局部注册

        ```html
        <!-- 需要先引入vue：<script src="https://cdn.jsdelivr.net/npm/vue"></script> -->
        <script src="dist/vue-count-down.min.js"></script>
        

        
        <script>
        new Vue({
          components: {
            // 局部注册
            'count-down': vueCountDown
          }
        })
        </script>
        ```
       
#用法

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
                    自定义slot: 剩余时间 {{time.day}}天{{time.hour}}小时{{time.minute}}分{{time.second}}秒。。 总剩余秒数：{{time.restSecond}}
    
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
                    <template v-slot:counter="counter">
                        自定义slot： 还剩余{{counter.restCount}}
                    </template>
                </count-down>
        ```
        
# 事件

|  Name | Description                                          |
| :-----------: | ---------------------------------------------------- |
|    on-ended   | 倒计时结束回调                                       |
| on-update  | 每次倒计时回调                                       |
    
> on-update 触发输出参数 
>> timer模式：{day: "0", hour: "0", minute: "0", second: "10", restSecond: 10}
>> counter模式 ：{restCount}
>


``` html
        <count-down  :count="10" @ended="ended" @update="update"></count-down>
```
``` javascript
        methods: {
            ended () {
            console.log('done')
            },
            update (data) {
            console.log('update', data)
            }
        }
```
```
        输出：
        update {day: "0", hour: "0", minute: "0", second: "10", restSecond: 10}
        ....
        done
```

