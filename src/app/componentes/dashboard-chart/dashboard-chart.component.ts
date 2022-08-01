import { Component, Input, OnInit } from '@angular/core';
import { VeiculoService } from 'src/app/services/veiculo.service';

declare const google: any;

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})
export class DashboardChartComponent implements OnInit {

  @Input() dataConnected!: (string | number)[][];
  @Input() dataSoftUpdate!: (string | number)[][];

  constructor(private service: VeiculoService) { }

  connectedPerc!: number;
  softUpdatePerc!: number;

  ngOnInit(): void {
    this.getDataConnected();
    this.getDataSoftUpdate();
  }

  getDataConnected() {
    this.service.getDataChart(this.dataConnected).subscribe({
      next: (dados) => {
        this.dataConnected = dados;
        this.connectedPerc = +dados[1][1] * 100 / (+dados[0][1] + +dados[1][1]);
        this.connectedPerc = parseFloat(this.connectedPerc.toFixed(2));
        this.init();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getDataSoftUpdate() {
    this.service.getDataChart(this.dataSoftUpdate).subscribe({
      next: (dados) => {
        this.dataSoftUpdate = dados;
        this.softUpdatePerc = +dados[1][1] * 100 / (+dados[0][1] + +dados[1][1]);
        this.softUpdatePerc = parseFloat(this.softUpdatePerc.toFixed(2));
        this.init();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  async init(): Promise<void> {
    if (typeof (google) !== undefined) {
      await google.charts.load('current', { 'packages': ['corechart'] });
      await google.charts.setOnLoadCallback(this.displayConnected());
      await google.charts.setOnLoadCallback(this.displaySoftUpdate());
    }
  }

  displayConnected() {
    const el = document.querySelector('#donut_connected');
    const chart = new google.visualization.PieChart(el);
    const options = this.getOptions();

    options['title'] = 'Conectados';
    chart.draw(this.getDataTable(this.dataConnected), options);
  }

  displaySoftUpdate() {
    const el = document.querySelector('#donut_softUpdate');
    const chart = new google.visualization.PieChart(el);
    const options = this.getOptions();

    options['title'] = 'Update Software';
    chart.draw(this.getDataTable(this.dataSoftUpdate), options);
  }

  getDataTable(dados: (string | number)[][]): (string | number)[][] {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Valores');
    data.addColumn('number', dados);
    data.addRows(dados);

    return data;
  }

  getOptions(): any {
    return {
      legend: 'none',
      pieHole: 0.5,
      width: 470,
      height: 300,
      colors:['#a9a9a9','#0f4b84'],
      titleTextStyle: {
        fontSize: 20
      },
      // legend: {
      //   position: 'bottom', 
      //   textStyle: {
      //     fontSize: 16
      //   }
      // }
    }
  }

}
