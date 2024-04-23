export class Fig {
  sizeSpecify: boolean;
  size: [number, number];
  titleSpecify: boolean;
  title: string;
  titleSize: number;

  constructor() {
    this.sizeSpecify = true;
    this.size = [8, 6];
    this.titleSpecify = true;
    this.title = 'Plot Title';
    this.titleSize = 20;
  }
}

export class Plot {
  x: number;
  y: number;
  color: string;
  lineStyle: string;
  lineWidth: number;

  constructor() {
    this.x = 1;
    this.y = 2;
    this.color = 'black';
    this.lineStyle = '-';
    this.lineWidth = 2;
  }
}

export class Axis {
  id: string;
  limSpecify: boolean;
  lim: [number, number];
  logScale: boolean;
  label: string;
  labelSize: number;

  constructor(i: string, l: string) {
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

export class Settings {
  fig: Fig;
  plots: Array<Plot>;
  xAxis: Axis;
  yAxis: Axis;
  ticks: Ticks;

  constructor() {
    this.fig = new Fig();
    this.plots = [new Plot()];
    this.xAxis = new Axis('x', 'x-label sample');
    this.yAxis = new Axis('y', 'y-label sample');
    this.ticks = new Ticks();
  }
}

const settings = {
  'fig': {
    'size-specify': true,
    'size': [8, 6],
    'title-specify': true,
    'title': 'Plot Title',
    'title-size': 20,
  },
  'plot': [
    {
      'x': 1,
      'y': 2,
      'color': 'black',
      'line-style': '-',
      'line-width': 2,
    },
  ],
  'x-axis': {
    'lim-specify': false,
    'lim': [0, 1],
    'log-scale': false,
    'label': 'x-label sample',
    'label-size': 15,
  },
  'y-axis': {
    'lim-specify': true,
    'lim': [0, 1],
    'log-scale': false,
    'label': 'y-label sample',
    'label-size': 15,
  },
  'ticks': {
    'label-size': 15,
  },
};

export default settings;