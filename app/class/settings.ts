export class Fig {
  sizeSpecify: boolean;
  size: [number, number];
  titleSpecify: boolean;
  title: string;
  titleSize: number;

  constructor() {
    this.sizeSpecify = true;
    this.size = [6, 4.5];
    this.titleSpecify = true;
    this.title = 'Plot Title';
    this.titleSize = 20;
  }
}

export type PlotColor = ('black' | 'blue' | 'red' | 'green' | 'orange' | 'magenta' | 'cyan');
export type PlotLineStyle = (
  { spec: '-', label: 'solid' } |
  { spec: '--', label: 'dashed' } |
  { spec: ':', label: 'dotted' } |
  { spec: '-.', label: 'dash-dotted' }
);
export type PlotLineStyleSpec = ('-' | '--' | ':' | '-.');

export class Plot {
  id: string;
  x: number;
  y: number;
  color: PlotColor;
  lineStyle: PlotLineStyle;
  lineWidth: number;
  legend: string;

  constructor() {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.id = Array.from(Array(16)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
    this.x = 1;
    this.y = 2;
    this.color = 'black';
    this.lineStyle = { spec: '-', label: 'solid' };
    this.lineWidth = 2;
    this.legend = '';
  }
}

export type PlotLegendLocation = ('best' | 'upper left' | 'upper right' | 'lower left' | 'lower right');

export class Plots {
  skiprows: number;
  plotList: Array<Plot>;
  legendFlag: boolean;
  legendSize: number;
  legendLocation: PlotLegendLocation;

  constructor() {
    this.skiprows = 0;
    this.plotList = [new Plot()];
    this.legendFlag = false;
    this.legendSize = 15;
    this.legendLocation = 'best';
  }
}

export type AxisID = 'x' | 'y';

export class Axis {
  id: AxisID;
  limSpecify: boolean;
  lim: [number, number];
  logScale: boolean;
  label: string;
  labelSize: number;

  constructor(i: AxisID, l: string) {
    this.id = i;
    this.limSpecify = true;
    this.lim = [0, 1];
    this.logScale = false;
    this.label = l;
    this.labelSize = 15;
  }

  getID(this: Axis) {
    return this.id;
  }
}

export class Ticks {
  labelSize: number;

  constructor() {
    this.labelSize = 15;
  }
}

export type ImageType = 'png' | 'pdf';

export class Settings {
  imageType: ImageType;
  fig: Fig;
  plots: Plots;
  xAxis: Axis;
  yAxis: Axis;
  ticks: Ticks;

  constructor() {
    this.imageType = 'png';
    this.fig = new Fig();
    this.plots = new Plots();
    this.xAxis = new Axis('x', 'x-label sample');
    this.yAxis = new Axis('y', 'y-label sample');
    this.ticks = new Ticks();
  }
}
