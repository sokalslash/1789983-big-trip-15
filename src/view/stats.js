import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import SmartView from './smart.js';

const createStatisticsTemplate = () => {
  return `<section class="statistics">
  <h2>Trip statistics</h2>

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
};

export default class Statistics extends SmartView {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }
}
