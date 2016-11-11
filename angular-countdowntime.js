angular
.module('angular-countdowntime', [])
.directive('countdownTime', [
  '$interval',
  '$parse',
  '$log',
  function($interval, $parse, $log){
    return {
      restrict: 'AE',
      scope: true,
      link: function($scope, $elem, $attrs){

        var intervalId;

        var timeFormat = $attrs.timeFormat || 'full';
        var timeInterval = $attrs.timeInterval ? (+$attrs.timeInterval) : 1000;

        if(!$attrs.timeEnd){
          $log.error('countdownTime expect attribute timeEnd');
          return;
        }

        var timeEnd = $attrs.timeEnd;
        if(typeof timeEnd === 'string'){
          // convert '2016-02-27 12:00:00' => '2016-02-27T12:00:00'
          timeEnd = timeEnd.replace(' ', 'T');
        }
        if(typeof timeEnd === 'string' && timeEnd.match(/^\d*$/)){
          timeEnd = +timeEnd;
        }

        var timeEndCallback = $attrs.timeEndCallback ?
          $parse($attrs.timeEndCallback) : angular.noop;

        startInterval();

        $scope.$on('$destroy', stopInterval);

        function startInterval(){
          if(!intervalId){
            intervalId = $interval(stepInterval, timeInterval);
          }
          stepInterval();
        }

        function stopInterval(){
          if(intervalId){
            $interval.cancel(intervalId);
            intervalId = null;
          }
        }

        function stepInterval(){

          var beginTime = +new Date();
          var endTime = +new Date(timeEnd);

          var second = 1000; // 每秒钟1000毫秒
          var minute = second * 60; // 每分钟60秒
          var hour = minute * 60; // 每小时60分钟
          var day = hour * 24; // 每天24小时

          var seconds;
          var minutes;
          var hours;
          var days;

          var offset;
          var tmp;
          var ref;

          // days获取
          offset = endTime - beginTime;
          offset = offset >= 0 ? offset : 0;
          days = offset >= day ? parseInt(offset / day, 10) : 0;
          $scope.days = days;

          // hours获取
          offset = offset - day * days;
          offset = offset >= 0 ? offset : 0;
          hours = offset >= hour ? parseInt(offset / hour, 10) : 0;
          ref = hours > 9 ? (hours + '') : ('0' + hours);
          tmp = ref.split('');
          $scope.hours = hours;
          $scope.uHours = tmp[1];
          $scope.dHours = (hours > 9 || timeFormat === 'full') ? tmp[0] : '';

          // minutes获取
          offset = offset - hour * hours;
          offset = offset >= 0 ? offset : 0;
          minutes = offset >= minute ? parseInt(offset / minute, 10) : 0;
          ref = minutes > 9 ? (minutes + '') : ('0' + minutes);
          tmp = ref.split('');
          $scope.minutes = minutes;
          $scope.uMinutes = tmp[1];
          $scope.dMinutes = (minutes > 9 || timeFormat === 'full') ? tmp[0] : '';

          // seconds获取
          offset = offset - minute * minutes;
          offset = offset >= 0 ? offset : 0;
          seconds = offset >= second ? parseInt(offset / second, 10) : 0;
          ref = seconds > 9 ? (seconds + '') : ('0' + seconds);
          tmp = ref.split('');
          $scope.seconds = seconds;
          $scope.uSeconds = tmp[1];
          $scope.dSeconds = (seconds > 9 || timeFormat === 'full') ? tmp[0] : '';

          if(hours === 0 && minutes === 0 && seconds === 0){
            stopInterval();
            timeEndCallback($scope);
          }
        }
      }
    };
  }
]);
