import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrderService } from '../../../core/services';
import { RevenueStats } from '../../../core/models';

@Component({
  selector: 'app-statistics',
  template: `
    <div class="statistics-page">
      <div class="page-header">
        <h1>Thống kê doanh thu</h1>
        <div class="date-filter">
          <input type="date" [(ngModel)]="startDate" class="form-control">
          <span>-</span>
          <input type="date" [(ngModel)]="endDate" class="form-control">
          <button class="btn btn-primary" (click)="loadStats()">
            <span class="material-icons">filter_alt</span>
            Lọc
          </button>
        </div>
      </div>

      <div class="stats-grid" *ngIf="stats">
        <div class="stat-card">
          <span class="material-icons">payments</span>
          <div>
            <div class="stat-value">{{ stats.totalRevenue | vndCurrency }}</div>
            <div class="stat-label">Tổng doanh thu</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons">receipt_long</span>
          <div>
            <div class="stat-value">{{ stats.totalOrders }}</div>
            <div class="stat-label">Tổng đơn hàng</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons">shopping_bag</span>
          <div>
            <div class="stat-value">{{ stats.averageOrderValue | vndCurrency }}</div>
            <div class="stat-label">Giá trị TB / đơn</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons">verified</span>
          <div>
            <div class="stat-value">{{ stats.completedOrders }}</div>
            <div class="stat-label">Đơn hoàn thành</div>
          </div>
        </div>
      </div>

      <div class="charts-grid" *ngIf="stats">
        <div class="chart-card chart-card-wide">
          <div class="chart-title">
            <h2>Doanh thu và đơn hàng theo ngày</h2>
            <p>So sánh biến động doanh thu với số lượng đơn hoàn thành.</p>
          </div>
          <highcharts-chart
            [Highcharts]="Highcharts"
            [options]="revenueChartOptions"
            class="chart">
          </highcharts-chart>
        </div>

        <div class="chart-card">
          <div class="chart-title">
            <h2>Cơ cấu trạng thái đơn</h2>
            <p>Tỷ trọng đơn theo từng trạng thái xử lý.</p>
          </div>
          <highcharts-chart
            [Highcharts]="Highcharts"
            [options]="statusChartOptions"
            class="chart compact">
          </highcharts-chart>
        </div>

        <div class="chart-card">
          <div class="chart-title">
            <h2>So sánh số đơn theo trạng thái</h2>
            <p>Dễ nhìn nhanh backlog và số đơn đã hoàn tất.</p>
          </div>
          <highcharts-chart
            [Highcharts]="Highcharts"
            [options]="statusColumnOptions"
            class="chart compact">
          </highcharts-chart>
        </div>

        <div class="chart-card">
          <div class="chart-title">
            <h2>Top sản phẩm theo số lượng bán</h2>
            <p>Xếp hạng các sản phẩm bán chạy nhất.</p>
          </div>
          <highcharts-chart
            [Highcharts]="Highcharts"
            [options]="topProductsSoldOptions"
            class="chart compact">
          </highcharts-chart>
        </div>

        <div class="chart-card">
          <div class="chart-title">
            <h2>So sánh doanh thu top sản phẩm</h2>
            <p>Doanh thu ước tính theo số lượng đã bán.</p>
          </div>
          <highcharts-chart
            [Highcharts]="Highcharts"
            [options]="topProductsRevenueOptions"
            class="chart compact">
          </highcharts-chart>
        </div>
      </div>

      <div class="empty-state" *ngIf="!stats">
        <span class="material-icons">query_stats</span>
        <h3>Chưa có dữ liệu thống kê</h3>
        <p>Chọn khoảng thời gian và tải lại báo cáo.</p>
      </div>
    </div>
  `,
  styles: [`
    .statistics-page { max-width: 1440px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; h1 { font-size: 24px; } }
    .date-filter { display: flex; align-items: center; gap: 12px; background: white; border: 1px solid #e6e8ec; border-radius: 10px; padding: 12px; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04); }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 24px; @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 620px) { grid-template-columns: 1fr; } }
    .stat-card { background: white; border: 1px solid #e6e8ec; border-radius: 10px; padding: 20px; box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06); display: flex; align-items: center; gap: 16px; }
    .stat-card > .material-icons { width: 46px; height: 46px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; color: white; background: var(--primary-color); font-size: 24px; flex-shrink: 0; }
    .stat-value { font-size: 24px; font-weight: 800; color: #182230; margin-bottom: 4px; line-height: 1.2; }
    .stat-label { font-size: 13px; color: var(--text-secondary); font-weight: 600; }
    .charts-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
    .chart-card { background: white; border: 1px solid #e6e8ec; border-radius: 10px; padding: 20px; box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06); min-width: 0; }
    .chart-card-wide { grid-column: 1 / -1; }
    .chart-title { margin-bottom: 12px; }
    .chart-title h2 { font-family: inherit; font-size: 18px; margin: 0 0 4px; color: #182230; }
    .chart-title p { margin: 0; color: var(--text-secondary); font-size: 13px; }
    .chart { display: block; width: 100%; height: 380px; }
    .chart.compact { height: 340px; }
    .empty-state { background: white; border: 1px solid #e6e8ec; border-radius: 10px; box-shadow: var(--shadow); }
    @media (max-width: 1024px) {
      .charts-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .date-filter { width: 100%; display: grid; grid-template-columns: 1fr; }
      .date-filter span { display: none; }
      .chart, .chart.compact { height: 300px; }
    }
  `]
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  stats: RevenueStats | null = null;
  startDate = '';
  endDate = '';

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
