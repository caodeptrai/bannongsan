import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrderService } from '../../../core/services';
import { RevenueStats } from '../../../core/models';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  stats: RevenueStats | null = null;
  startDate = '';
  endDate = '';
  chartUpdateFlag = false;

  revenueChartOptions: Highcharts.Options = {};
  statusChartOptions: Highcharts.Options = {};
  statusColumnOptions: Highcharts.Options = {};
  topProductsSoldOptions: Highcharts.Options = {};
  topProductsRevenueOptions: Highcharts.Options = {};

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = firstDay.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
    this.loadStats();
  }

  loadStats(): void {
    this.orderService.getRevenueStats(this.startDate, this.endDate).subscribe({
      next: (res) => {
        if (res.success) {
          this.stats = res.data;
          this.buildCharts(res.data);
        }
      }
    });
  }

  private buildCharts(stats: RevenueStats): void {
    this.revenueChartOptions = this.buildRevenueChart(stats);
    this.statusChartOptions = this.buildStatusChart(stats);
    this.statusColumnOptions = this.buildStatusColumnChart(stats);
    this.topProductsSoldOptions = this.buildTopProductsSoldChart(stats);
    this.topProductsRevenueOptions = this.buildTopProductsRevenueChart(stats);
    this.chartUpdateFlag = true;
    window.setTimeout(() => {
      this.chartUpdateFlag = false;
    });
  }

  private baseOptions(): Highcharts.Options {
    return {
      credits: { enabled: false },
      title: { text: undefined },
      chart: {
        style: { fontFamily: 'Be Vietnam Pro, Arial, sans-serif' },
        backgroundColor: 'transparent',
      },
      legend: {
        itemStyle: { color: '#344054', fontWeight: '600' },
      },
      tooltip: {
        borderRadius: 8,
        backgroundColor: '#ffffff',
        borderColor: '#e6e8ec',
        shadow: true,
      },
    };
  }

  private buildRevenueChart(stats: RevenueStats): Highcharts.Options {
    const categories = stats.revenueByDate.map(item => this.formatDateLabel(item.date));
    const revenue = stats.revenueByDate.map(item => item.revenue);
    const orders = stats.revenueByDate.map(item => item.orders);

    return {
      ...this.baseOptions(),
      chart: { ...this.baseOptions().chart, type: 'column' },
      xAxis: {
        categories,
        labels: { style: { color: '#667085' } },
        lineColor: '#e6e8ec',
      },
      yAxis: [
        {
          title: { text: 'Doanh thu', style: { color: '#2f7d46' } },
          labels: { formatter: function () { return StatisticsComponent.compactCurrency(Number(this.value)); } },
          gridLineColor: '#eef2f6',
        },
        {
          title: { text: 'Số đơn', style: { color: '#2563eb' } },
          labels: { style: { color: '#2563eb' } },
          opposite: true,
          allowDecimals: false,
        },
      ],
      tooltip: {
        ...this.baseOptions().tooltip,
        shared: true,
        formatter: function () {
          const points = this.points || [];
          const lines = points.map(point => {
            const value = point.series.name.includes('Doanh thu')
              ? StatisticsComponent.formatCurrency(Number(point.y || 0))
              : `${point.y || 0} đơn`;
            return `<span style="color:${point.color}">●</span> ${point.series.name}: <b>${value}</b>`;
          });
          return `<b>${this.x}</b><br>${lines.join('<br>')}`;
        },
      },
      plotOptions: {
        column: { borderRadius: 4, pointPadding: 0.12, groupPadding: 0.16 },
      },
      series: [
        {
          type: 'column',
          name: 'Doanh thu',
          data: revenue,
          color: '#2f7d46',
        },
        {
          type: 'spline',
          name: 'Số đơn',
          data: orders,
          color: '#2563eb',
          yAxis: 1,
          marker: { enabled: true, radius: 4 },
        },
      ],
    };
  }

  private buildStatusChart(stats: RevenueStats): Highcharts.Options {
    const data: Highcharts.PointOptionsObject[] = this.statusData(stats).map(item => ({
      name: item.name,
      y: item.value,
      color: item.color,
    }));

    return {
      ...this.baseOptions(),
      chart: { ...this.baseOptions().chart, type: 'pie' },
      tooltip: {
        ...this.baseOptions().tooltip,
        pointFormat: '<b>{point.y}</b> đơn ({point.percentage:.1f}%)',
      },
      plotOptions: {
        pie: {
          innerSize: '62%',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            distance: 18,
            format: '{point.name}<br><b>{point.y}</b>',
            style: { color: '#344054', fontWeight: '600', textOutline: 'none' },
          },
        },
      },
      series: [{ type: 'pie', name: 'Trạng thái', data }],
    };
  }

  private buildStatusColumnChart(stats: RevenueStats): Highcharts.Options {
    const data = this.statusData(stats);

    return {
      ...this.baseOptions(),
      chart: { ...this.baseOptions().chart, type: 'column' },
      xAxis: {
        categories: data.map(item => item.name),
        labels: { style: { color: '#667085' } },
        lineColor: '#e6e8ec',
      },
      yAxis: {
        title: { text: 'Số đơn' },
        allowDecimals: false,
        gridLineColor: '#eef2f6',
      },
      tooltip: {
        ...this.baseOptions().tooltip,
        pointFormat: '<b>{point.y}</b> đơn',
      },
      legend: { enabled: false },
      plotOptions: {
        column: { borderRadius: 6 },
      },
      series: [{
        type: 'column',
        name: 'Số đơn',
        data: data.map(item => ({ y: item.value, color: item.color })),
      }],
    };
  }

  private buildTopProductsSoldChart(stats: RevenueStats): Highcharts.Options {
    const products = stats.topProducts.slice(0, 8);

    return {
      ...this.baseOptions(),
      chart: { ...this.baseOptions().chart, type: 'bar' },
      xAxis: {
        categories: products.map(item => item.name),
        labels: { style: { color: '#344054', fontSize: '11px' } },
      },
      yAxis: {
        title: { text: 'Số lượng đã bán' },
        allowDecimals: false,
        gridLineColor: '#eef2f6',
      },
      tooltip: {
        ...this.baseOptions().tooltip,
        pointFormat: '<b>{point.y}</b> sản phẩm đã bán',
      },
      legend: { enabled: false },
      plotOptions: {
        bar: { borderRadius: 5, color: '#2563eb' },
      },
      series: [{
        type: 'bar',
        name: 'Đã bán',
        data: products.map(item => item.soldCount),
      }],
    };
  }

  private buildTopProductsRevenueChart(stats: RevenueStats): Highcharts.Options {
    const products = stats.topProducts.slice(0, 8);

    return {
      ...this.baseOptions(),
      chart: { ...this.baseOptions().chart, type: 'column' },
      xAxis: {
        categories: products.map(item => item.name),
        labels: {
          style: { color: '#667085', fontSize: '11px' },
          rotation: -25,
        },
      },
      yAxis: {
        title: { text: 'Doanh thu' },
        labels: { formatter: function () { return StatisticsComponent.compactCurrency(Number(this.value)); } },
        gridLineColor: '#eef2f6',
      },
      tooltip: {
        ...this.baseOptions().tooltip,
        formatter: function () {
          return `<b>${this.x}</b><br>Doanh thu: <b>${StatisticsComponent.formatCurrency(Number(this.y || 0))}</b>`;
        },
      },
      legend: { enabled: false },
      plotOptions: {
        column: { borderRadius: 6, color: '#d97706' },
      },
      series: [{
        type: 'column',
        name: 'Doanh thu',
        data: products.map(item => item.revenue),
      }],
    };
  }

  private statusData(stats: RevenueStats) {
    return [
      { name: 'Chờ xác nhận', value: stats.pendingOrders, color: '#f59e0b' },
      { name: 'Đã xác nhận', value: stats.confirmedOrders, color: '#2563eb' },
      { name: 'Đang giao', value: stats.shippingOrders, color: '#7c3aed' },
      { name: 'Hoàn thành', value: stats.completedOrders, color: '#16a34a' },
      { name: 'Đã hủy', value: stats.cancelledOrders, color: '#dc2626' },
    ];
  }

  private formatDateLabel(value: string): string {
    const date = new Date(`${value}T00:00:00`);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  }

  static formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  static compactCurrency(value: number): string {
    if (value >= 1000000000) return `${Math.round(value / 100000000) / 10} tỷ`;
    if (value >= 1000000) return `${Math.round(value / 100000) / 10} tr`;
    if (value >= 1000) return `${Math.round(value / 100) / 10}k`;
    return `${value}`;
  }
}
