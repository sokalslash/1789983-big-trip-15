import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractView from './abstract.js';
import {BAR_HEIGHT, typesOfPoints, getCostByPointType, getTypeCount, getPointsForType, getTimeDifference, getHumanizedTime, getSortedArrayLabelsWithData} from '../utils/stats-util.js';

const renderMoneyChart = (moneyCtx, points) => {
  const expensesByPointType = typesOfPoints.map((type) => getCostByPointType(type, points));
  moneyCtx.height = BAR_HEIGHT * typesOfPoints.length;

  const sortedLabelsWithData = getSortedArrayLabelsWithData(typesOfPoints, expensesByPointType);
  const sortedTypesOfPoints = [];
  const sortedExpensesByPointType = [];
  sortedLabelsWithData.forEach((labelWithData) => {
    sortedTypesOfPoints.push(labelWithData.label);
    sortedExpensesByPointType.push(labelWithData.data);
  });

  return  new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTypesOfPoints,
      datasets: [{
        data: sortedExpensesByPointType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {
  const howManyTypeUsed = typesOfPoints.map((type) => getTypeCount(type, points));
  typeCtx.height = BAR_HEIGHT * typesOfPoints.length;

  const sortedLabelsWithData = getSortedArrayLabelsWithData(typesOfPoints, howManyTypeUsed);
  const sortedTypesOfPoints = [];
  const sortedHowManyTypeUsed = [];
  sortedLabelsWithData.forEach((labelWithData) => {
    sortedTypesOfPoints.push(labelWithData.label);
    sortedHowManyTypeUsed.push(labelWithData.data);
  });

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTypesOfPoints,
      datasets: [{
        data: sortedHowManyTypeUsed,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  const pointsForType = typesOfPoints.map((type) => getPointsForType(type, points));
  timeCtx.height = BAR_HEIGHT * typesOfPoints.length;

  const durationOfpointsForType = pointsForType.map((correspondingPoints) => correspondingPoints.map((point) => getTimeDifference(point.dateTo, point.dateFrom)));
  const amountDurationOfpointsForType = durationOfpointsForType.map((timePoints) => {
    if (timePoints.length !== 0) {
      return timePoints.reduce((amountTime, pointTime) => amountTime + pointTime, 0);
    }
    return 0;
  });

  const sortedLabelsWithData = getSortedArrayLabelsWithData(typesOfPoints, amountDurationOfpointsForType);
  const sortedTypesOfPoints = [];
  const sortedAmountDurationOfpointsForType = [];
  sortedLabelsWithData.forEach((labelWithData) => {
    sortedTypesOfPoints.push(labelWithData.label);
    sortedAmountDurationOfpointsForType.push(labelWithData.data);
  });

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTypesOfPoints,
      datasets: [{
        data: sortedAmountDurationOfpointsForType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => getHumanizedTime(val),
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = () => `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="money" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="type" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
  </div>
</section>`;

export default class Statistics extends AbstractView {
  constructor(points) {
    super();
    this._points = points;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    this._moneyChart = renderMoneyChart(moneyCtx, this._points);
    this._typeChart = renderTypeChart(typeCtx, this._points);
    this._timeChart = renderTimeChart(timeCtx, this._points);
  }
}
