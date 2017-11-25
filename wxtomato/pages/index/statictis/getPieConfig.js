/**
 * Created by xiabingwu on 2016/11/21.
 */
export default function (canvasConfig, labels, data) {
  var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)'
  };
  var chartConfig = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: data,
        backgroundColor: [
          chartColors.red,
          chartColors.orange,
          chartColors.yellow,
          chartColors.green,
          chartColors.purple,
          chartColors.blue,
        ]
      }]
    },
    options: {
      responsive: true
    }
  };
  return {
    chartConfig: chartConfig,
    canvasConfig: canvasConfig
  }
}