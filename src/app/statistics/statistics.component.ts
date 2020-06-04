import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ApplicationService} from '../app.service';
import {Statistics} from '../model/statistics';
import * as Highcharts from 'highcharts';
import {Counters} from '../model/counters';


@Component({
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statistics: Statistics[] = [];
  displayedColumns: string[] = ['time', 'number', 'size', 'diaphazone'];

  diaphazone1_10: Statistics[] = [];
  diaphazone10_100: Statistics[] = [];
  diaphazone100_1000: Statistics[] = [];
  diaphazone1000_10000: Statistics[] = [];

  counters1_10: Counters;
  counters10_100: Counters;
  counters100_1000: Counters;
  counters1000_10000: Counters;

  constructor(private fb: FormBuilder,
              private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.applicationService.getStatistics().subscribe(data => this.statistics = data);
    this.applicationService.getStatisticsByDiaphazone('1-10').subscribe(data => {
      this.diaphazone1_10 = data;
      this.applicationService.getStatisticsByDiaphazone('10-100').subscribe(d1 => {
        this.diaphazone10_100 = d1;
        this.applicationService.getStatisticsByDiaphazone('100-1000').subscribe(d2 => {
          this.diaphazone100_1000 = d2;
          this.applicationService.getStatisticsByDiaphazone('1000-10000').subscribe(d3 => {
            this.applicationService.getCountersByDiaphazone('1-10').subscribe(data1 => {
              this.counters1_10 = data1;
              this.applicationService.getCountersByDiaphazone('10-100').subscribe(data2 => {
                this.counters10_100 = data2;
                this.applicationService.getCountersByDiaphazone('100-1000').subscribe(data3 => {
                  this.counters100_1000 = data3;
                  this.applicationService.getCountersByDiaphazone('1000-10000').subscribe(data4 => {
                    this.counters1000_10000 = data4;

                    this.diaphazone1000_10000 = d3;
                    this.buildChart();
                    this.buildPie();
                    this.buildPie1();
                    this.buildPie2();
                    this.buildPie3();
                  });
                });
              });
            });
          });
        });
      });
    });

  }

  getTimeFromStatistics(array: Statistics[]): number[] {
    const time = [];
    array.forEach(a => time.push(a.time));
    return time;
  }

  getSizeFromStatistics(array: Statistics[]): number[] {
    const size = [];
    array.forEach(a => size.push(a.sizeMatrix));
    return size;
  }

  getNumbersFromStatistics(array: Statistics[]): number[] {
    const numbers = [];
    array.forEach(a => numbers.push(a.numberMatrix));
    return numbers;
  }

  buildChart(): void {

    console.log(this.diaphazone1_10);
    (Highcharts as any).chart('container', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Залежність часу виконання алгоритму від розмірності матриць та діапазону чисел'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        title: {
          text: 'Розмірність матриці'
        },
        categories: this.getSizeFromStatistics(this.diaphazone1_10)
      },
      yAxis: {
        title: {
          text: 'Час (мс)'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: '1-10',
        data: this.getTimeFromStatistics(this.diaphazone1_10)
      }, {
        name: '10-100',
        data: this.getTimeFromStatistics(this.diaphazone10_100)
      }, {
        name: '100-1000',
        data: this.getTimeFromStatistics(this.diaphazone100_1000)
      }, {
        name: '1000-10000',
        data: this.getTimeFromStatistics(this.diaphazone1000_10000)
      }]
    });
  }

  buildPie1() {
    (Highcharts as any).chart('container2', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Діапазон данних 10-100'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer'
        }
      },
      series: [{
        name: '',
        colorByPoint: true,
        data: [{
          name: 'Узагальнена задача є компромісною',
          y: this.counters10_100.counterAdditional,
          sliced: true,
          selected: true
        }, {
          name: 'Узагальнена задача не є компромісною',
          y: this.counters10_100.counterNotAdditional
        }
        ]
      }]
    });
  }

  buildPie2() {
    (Highcharts as any).chart('container4', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Діапазон данних 100-1000'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer'
        }
      },
      series: [{
        name: '',
        colorByPoint: true,
        data: [{
          name: 'Узагальнена задача є компромісною',
          y: this.counters100_1000.counterAdditional,
          sliced: true,
          selected: true
        }, {
          name: 'Узагальнена задача не є компромісною',
          y: this.counters100_1000.counterNotAdditional
        }
        ]
      }]
    });
  }

  buildPie() {
    (Highcharts as any).chart('container1', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Діапазон данних 1-10'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer'
        }
      },
      series: [{
        name: '',
        colorByPoint: true,
        data: [{
          name: 'Узагальнена задача є компромісною',
          y: this.counters1_10.counterAdditional,
          sliced: true,
          selected: true
        }, {
          name: 'Узагальнена задача не є компромісною',
          y: this.counters1_10.counterNotAdditional
        }
        ]
      }]
    });
  }
  buildPie3() {
    (Highcharts as any).chart('container3', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Діапазон данних 1000-10000'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer'
        }
      },
      series: [{
        name: '',
        colorByPoint: true,
        data: [{
          name: 'Узагальнена задача є компромісною',
          y: this.counters1000_10000.counterAdditional,
          sliced: true,
          selected: true
        }, {
          name: 'Узагальнена задача не є компромісною',
          y: this.counters1000_10000.counterNotAdditional
        }
        ]
      }]
    });
  }
}

