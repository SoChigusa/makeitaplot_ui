import { Add, ArrowDownward, ArrowUpward, CheckBox, Delete, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, FormGroup, IconButton, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { checkPositiveNumber } from "../utils/alertUtils";
import { ChangeEvent, FocusEventHandler, MouseEventHandler, useState } from "react";
import { Plot, PlotColor, PlotLegendLocation, PlotLineStyle, PlotLineStyleSpec, Plots } from "../class/settings";

type Props = {
  plot: Plot,
  legendFlag: boolean,
  handleChangePlotX: (x: number) => void,
  handleChangePlotY: (y: number) => void,
  handleChangePlotColor: (color: PlotColor) => void,
  handleChangePlotLineStyle: (lineStyle: PlotLineStyle) => void,
  handleChangePlotLineWidth: (lineWidth: number) => void,
  handleChangePlotLegend: (legend: string) => void,
};

const PlotSettingsEach = (props: Props) => {

  // list of selections
  const colorList: PlotColor[] = ['black', 'blue', 'red', 'green', 'orange', 'magenta', 'cyan'];
  const lineStyleList: PlotLineStyle[] = [
    { spec: '-', label: 'solid' },
    { spec: '--', label: 'dashed' },
    { spec: ':', label: 'dotted' },
    { spec: '-.', label: 'dash-dotted' }
  ];

  const setPlotX: FocusEventHandler<HTMLInputElement> = event => {
    const x: number = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: props.plot.x,
      label: 'Plot x'
    });
    props.handleChangePlotX(x);
  };

  const setPlotY: FocusEventHandler<HTMLInputElement> = event => {
    const y: number = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: props.plot.y,
      label: 'Plot y'
    });
    props.handleChangePlotY(y);
  };

  const onChangePlotColor: FocusEventHandler<HTMLInputElement> = event => {
    const color = event.target.value as PlotColor;
    props.handleChangePlotColor(color);
  };

  const onChangePlotLineStyle: FocusEventHandler<HTMLInputElement> = event => {
    const lineStyleSpec = event.target.value as PlotLineStyleSpec;
    const lineStyle = lineStyleList.find(ls => ls.spec === lineStyleSpec);
    if (lineStyle !== undefined) {
      props.handleChangePlotLineStyle(lineStyle);
    } else {
      console.log(`Undefined line style spectator ${lineStyleSpec} detected.`);
    }
  };

  const setPlotLineWidth: FocusEventHandler<HTMLInputElement> = event => {
    const lineWidth: number = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: props.plot.lineWidth,
      label: 'Line width'
    });
    props.handleChangePlotLineWidth(lineWidth);
  };

  const setPlotLegend: FocusEventHandler<HTMLInputElement> = event => {
    const legend: string = event.currentTarget.value;
    props.handleChangePlotLegend(legend);
  };

  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography variant="body1">
        Data columns
      </Typography>
      <TextField
        required
        sx={{ width: 80 }}
        InputProps={{ inputProps: { min: 1 } }}
        size="small"
        type="number"
        id="plot-x"
        label="x"
        key={`plot-x-${props.plot.id}`}
        defaultValue={props.plot.x}
        onBlur={setPlotX}
      />
      <TextField
        required
        sx={{ width: 80 }}
        InputProps={{ inputProps: { min: 1 } }}
        size="small"
        type="number"
        id="plot-y"
        label="y"
        key={`plot-y-${props.plot.id}`}
        defaultValue={props.plot.y}
        onBlur={setPlotY}
      />
      <TextField
        select
        required
        sx={{ width: 120 }}
        size="small"
        id="plot-color"
        label="Color"
        key={`plot-color-${props.plot.id}`}
        value={props.plot.color}
        onChange={onChangePlotColor}
      >
        {
          colorList.map((c: PlotColor) => (
            <MenuItem value={c} key={`plot-color-selector-${c}`}>{c}</MenuItem>
          ))
        }
      </TextField>
      <TextField
        select
        required
        sx={{ width: 135 }}
        size="small"
        id="plot-line-style"
        label="Line style"
        key={`plot-line-style-${props.plot.id}`}
        value={props.plot.lineStyle.spec}
        onChange={onChangePlotLineStyle}
      >
        {
          lineStyleList.map(ls => (
            <MenuItem value={ls.spec} key={`plot-line-style-selector-${ls.label}`}>{ls.label}</MenuItem>
          ))
        }
      </TextField>
      <TextField
        required
        sx={{ width: 100 }}
        InputProps={{ inputProps: { min: 1 } }}
        size="small"
        type="number"
        id="plot-line-width"
        label="Line width"
        key={`plot-line-width-${props.plot.id}`}
        defaultValue={props.plot.lineWidth}
        onBlur={setPlotLineWidth}
      />
      <TextField
        sx={{ width: 180 }}
        size="small"
        id="plot-legend"
        label="Legend"
        key={`plot-legend-${props.plot.id}`}
        disabled={!props.legendFlag}
        defaultValue={props.plot.legend}
        onBlur={setPlotLegend}
      />
    </Stack>
  );
};

const PlotSettings = ({ plots }: { plots: Plots }) => {
  const [specPlotList, setSpecPlotList] = useState(plots.plotList);
  const [specLegendFlag, setSpecLegendFlag] = useState(plots.legendFlag);
  const [specLegendLocation, setSpecLegendLocation] = useState(plots.legendLocation);

  // overall plot operations
  const add = () => {
    const plot = new Plot();
    const updatedPlotList = [...specPlotList];
    updatedPlotList.push(plot);
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  const moveUpward = (index: number) => {
    const updatedPlotList = [...specPlotList];
    [updatedPlotList[index], updatedPlotList[index - 1]] = [updatedPlotList[index - 1], updatedPlotList[index]];
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  const moveDownward = (index: number) => {
    const updatedPlotList = [...specPlotList];
    [updatedPlotList[index], updatedPlotList[index + 1]] = [updatedPlotList[index + 1], updatedPlotList[index]];
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  const deletePlot = (index: number) => {
    const updatedPlotList = [...specPlotList];
    updatedPlotList.splice(index, 1);
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  // each plot operations
  const onChangePlotX = (index: number, x: number) => {
    const updatedPlotList = [...specPlotList];
    updatedPlotList[index].x = x;
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  const onChangePlotY = (index: number, y: number) => {
    const updatedPlotList = [...specPlotList];
    updatedPlotList[index].y = y;
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  const onChangePlotColor = (index: number, color: PlotColor) => {
    const updatedPlotList = [...specPlotList];
    updatedPlotList[index].color = color;
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  const onChangePlotLineStyle = (index: number, lineStyle: PlotLineStyle) => {
    const updatedPlotList = [...specPlotList];
    updatedPlotList[index].lineStyle = lineStyle;
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  const onChangePlotLineWidth = (index: number, lineWidth: number) => {
    const updatedPlotList = [...specPlotList];
    updatedPlotList[index].lineWidth = lineWidth;
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  const onChangePlotLegend = (index: number, legend: string) => {
    const updatedPlotList = [...specPlotList];
    updatedPlotList[index].legend = legend;
    plots.plotList = updatedPlotList;
    setSpecPlotList(updatedPlotList);
  };

  // legend settings
  const onChangeLegend = (event: ChangeEvent<HTMLInputElement>) => {
    plots.legendFlag = event.target.checked;
    setSpecLegendFlag(event.target.checked);
  };

  const setLegendSize: FocusEventHandler<HTMLInputElement> = event => {
    plots.legendSize = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: plots.legendSize,
      label: 'Plot x'
    });
  };

  const legendLocationList: PlotLegendLocation[] = ['best', 'upper left', 'upper right', 'lower left', 'lower right'];
  const onChangeLegendLocation: FocusEventHandler<HTMLInputElement> = event => {
    const legendLocation = event.target.value as PlotLegendLocation;
    plots.legendLocation = legendLocation;
    setSpecLegendLocation(legendLocation);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="plot-settings"
        id="plot-settings-header"
      >
        Plot Settings
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          <Stack spacing={2}>
            <Box>
              <IconButton
                aria-label="Add plot"
                onClick={() => { add(); }}
              >
                <Add />
              </IconButton>
            </Box>
            {
              specPlotList.map((plot, index) => (
                <Stack key={`plot-settings-${index}`} spacing={1} direction="row">
                  <PlotSettingsEach
                    key={`plot-settings-${plot.id}`}
                    plot={plot}
                    legendFlag={plots.legendFlag}
                    handleChangePlotX={(x: number) => onChangePlotX(index, x)}
                    handleChangePlotY={(y: number) => onChangePlotY(index, y)}
                    handleChangePlotColor={(color: PlotColor) => onChangePlotColor(index, color)}
                    handleChangePlotLineStyle={(lineStyle: PlotLineStyle) => onChangePlotLineStyle(index, lineStyle)}
                    handleChangePlotLineWidth={(lineWidth: number) => onChangePlotLineWidth(index, lineWidth)}
                    handleChangePlotLegend={(legend: string) => onChangePlotLegend(index, legend)}
                  />
                  <Stack spacing={0} direction="row">
                    <IconButton
                      aria-label="Move upward"
                      disabled={index == 0}
                      onClick={() => { moveUpward(index); }}
                    >
                      <ArrowUpward />
                    </IconButton>
                    <IconButton
                      aria-label="Move downward"
                      disabled={index == specPlotList.length - 1}
                      onClick={() => { moveDownward(index); }}
                    >
                      <ArrowDownward />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      disabled={specPlotList.length == 1}
                      onClick={() => { deletePlot(index); }}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </Stack>
              ))
            }
            <Stack spacing={3} direction="row">
              <FormControlLabel
                control={<Checkbox
                  checked={specLegendFlag}
                  onChange={onChangeLegend}
                />}
                label="Show legend"
              />
              <Stack spacing={1} direction="row">
                <TextField
                  required
                  sx={{ width: 80 }}
                  size="small"
                  type="number"
                  id="plot-legend-size"
                  label="Size"
                  disabled={!plots.legendFlag}
                  defaultValue={plots.legendSize}
                  onBlur={setLegendSize}
                />
                <TextField
                  select
                  required
                  sx={{ width: 150 }}
                  size="small"
                  id="plot-legend-location"
                  label="Location"
                  key="plot-legend-location"
                  disabled={!plots.legendFlag}
                  value={specLegendLocation}
                  onChange={onChangeLegendLocation}
                >
                  {
                    legendLocationList.map((c: PlotLegendLocation) => (
                      <MenuItem value={c} key={`plot-legend-location-selector-${c}`}>{c}</MenuItem>
                    ))
                  }
                </TextField>
              </Stack>
            </Stack>
          </Stack>
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}

export default PlotSettings;