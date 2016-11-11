## angular-countdowntime

A countdown time directive for angular.

### Usage
1. include `angular-countdowntime` as angular dependence.

    ```js
    var app = angular.module('myApp', ['angular-countdowntime']);
    ```
2. write your element like this.

    ```js
    <div countdown-time time-end="2016-12-25T12:00:00" time-end-callback="doSomething()">
      {{dMinutes}}{{uMinutes}}:{{dSeconds}}{{uSeconds}}
    </div>
    ```

### Options

1. `time-format`, `full` with leading zero, or `normal` without leading zero.
2. `time-interval`, default to `1000`ms
3. `time-end`
4. `time-end-callback`, the callback when time countdown end.

### License
MIT
