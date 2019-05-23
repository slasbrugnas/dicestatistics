//////////////////////////////////////
//         Component inits          //
//////////////////////////////////////
$('.ui.dropdown')
  .dropdown({
    transition: 'drop'
  })
;

$('.ui.sidebar')
  .sidebar('toggle')
;

$('.sidebar-toggle').on('click', function() {
  $('.ui.sidebar').sidebar('toggle');
})

$('.form').on('submit', function(e) {
  e.preventDefault();
})

$('#dice-type-dropdown').dropdown('set selected', 6);
$('#dice-number-dropdown').dropdown('set selected', 2);

//////////////////////////////////////
//        PROBABILITY CHART         //
//////////////////////////////////////

var ctx = document.getElementById('dice-chart').getContext('2d');
var pchart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Probability',
        data: [{
          x: 2,
          y: 2.72
        }, {
          x: 3,
          y: 5.55
        }, {
          x: 4,
          y: 8.33
        }, {
          x: 5,
          y: 11.11
        }, {
          x: 6,
          y: 13.89
        }, {
          x: 7,
          y: 16.67
        }, {
          x: 8,
          y: 13.89
        }, {
          x: 9,
          y: 11.11
        }, {
          x: 10,
          y: 8.33
        }, {
          x: 11,
          y: 5.55
        }, {
          x: 12,
          y: 2.72
        }],
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        lineTension: 0.1
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: "Number of dice(s)"
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 18,
          callback: function(value) {
            return value + "%"
          }
        }
      }]
    }
  }
});

//////////////////////////////////////
//         SIMULATION CHART         //
//////////////////////////////////////

var ctx = document.getElementById('simulation-chart').getContext('2d');
var schart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [1, 2],
    datasets: [
      {
        label: 'Result',
        data: [2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 6,
          beginAtZero: true
        },
      }]
    }
  }
});


//////////////////////////////////////
//            SUM CHART             //
//////////////////////////////////////

var ctx = document.getElementById('sum-chart').getContext('2d');
var sumchart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Sum', 'Remainder'],
    datasets: [{
      label: 'Sum of the dice',
      data: [5, 7],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)']
    }]
  }
});
