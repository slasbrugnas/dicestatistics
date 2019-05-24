$(document).ready(function() {
var primary_color = "rgb(54, 162, 235)";
var secondary_color = "rgb(255, 99, 132)";
var neutral_color = "rgb(230,230,230)";

/* Update all charts and texts */
$('#update-charts, #btn-retry').on('click', function() {
  var max = _.toInteger($('#dice-type-dropdown > .menu > .active').attr('data-value'));
  var nb_dice = _.toInteger($('#dice-number-dropdown > .menu > .active').attr('data-value'));
  var labels = _.range(1, (nb_dice+1));
  var data = [];
  var sum = 0;
  for (var i = 0; i < nb_dice; i++) {
    data.push(Math.floor(Math.random() * max) + 1);
    sum += data[i];
  }
  update_simulate_chart (labels, max, data);
  update_sum_chart(sum, data.length * max);
  update_probability_chart(nb_dice, nb_dice * max, data);
});

function update_simulate_chart(labels, max, data) {
  schart.data.labels = labels;
  schart.data.datasets[0].data = data;
  schart.options.scales.yAxes[0].ticks.max = max;
  schart.update();
}

function update_sum_chart(sum, max) {
  var remainder = (max-sum > 0)? max-sum : sum-max;
  sumchart.data.datasets[0].data = [sum, remainder];
  sumchart.update();
}

function update_probability_chart(min, max, data) {
  var d = [];
  var labels = _.range(min, max+1);
  for(var i = min; i <= min * (max/min); i++) {
    d.push((dicePossibilities(i, min, (max/min))*100));
  }

  pchart.data.labels = labels;
  pchart.data.datasets[0].data = d;
  pchart.update();

  var pos = _.sum(data);

  $('#sum').text(pos);
  $('#minproba').text(d[0].toFixed(3));
  $('#proba').text(d[pos-min].toPrecision(4));
  $('#maxproba').text(d[Math.floor((d.length-1)/2)].toFixed(3));
  var luck = (1/(d[pos-min]/100)).toFixed(2);
  var luck_rounded = _.toInteger(luck);
  luck = ((luck - luck_rounded) === 0) ? luck_rounded : luck;
  $('#luck').text(luck);
}

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
    labels: [],
    datasets: [
      {
        label: 'Probability',
        data: [],
        fill: false,
        pointRadius: 4,
        backgroundColor: primary_color,
        lineTension: 0.1
      }
    ]
  },
  options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
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
    labels: [],
    datasets: [
      {
        label: 'Result',
        data: [],
        fill: false,
        backgroundColor: primary_color,
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
      data: [],
      backgroundColor: [primary_color, neutral_color]
    }]
  }
});

$('#btn-retry').click();
});
