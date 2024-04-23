import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, FormGroup, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { checkPositiveNumber } from "../utils/alertUtils";
import { FocusEventHandler, useState } from "react";
import { Plot } from "../class/settings";

const PlotSettings = ({ plot }: { plot: Plot }) => {
  const [color, setColor] = useState(plot.color);
  const [lineStyle, setLineStyle] = useState(plot.lineStyle);

  // list of selections
  const colorList = ['black', 'blue', 'red', 'green', 'orange', 'magenta', 'cyan'];
  const lineStyleList = [
    { spec: '-', label: 'solid' },
    { spec: '--', label: 'dashed' },
    { spec: ':', label: 'dotted' },
    { spec: '-.', label: 'dash-dotted' }
  ];

  const setPlotX: FocusEventHandler<HTMLInputElement> = event => {
    plot.x = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: plot.x,
      label: 'Plot x'
    });
  };

  const setPlotY: FocusEventHandler<HTMLInputElement> = event => {
    plot.y = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: plot.y,
      label: 'Plot y'
    });
  };

  const onChangePlotColor = (event: SelectChangeEvent) => {
    setColor(event.target.value);
    plot.color = event.target.value;
  };

  const onChangePlotLineStyle = (event: SelectChangeEvent) => {
    setLineStyle(event.target.value);
    plot.lineStyle = event.target.value;
  };

  const setPlotLineWidth: FocusEventHandler<HTMLInputElement> = event => {
    plot.lineWidth = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: plot.lineWidth,
      label: 'Line width'
    });
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
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="body1">
                Data columns
              </Typography>
              <TextField
                required
                size="small"
                type="number"
                id="plot-x"
                label="x"
                defaultValue={plot.x}
                onBlur={setPlotX}
              />
              <TextField
                required
                size="small"
                type="number"
                id="plot-y"
                label="y"
                defaultValue={plot.y}
                onBlur={setPlotY}
              />
              <Select
                required
                size="small"
                id="plot-color"
                label="Color"
                value={color}
                onChange={onChangePlotColor}
              >
                {
                  colorList.map((c: string) => (
                    <MenuItem value={c} key={`plot-color-selector-${c}`}>{c}</MenuItem>
                  ))
                }
              </Select>
              <Select
                required
                size="small"
                id="plot-line-style"
                label="Line style"
                value={lineStyle}
                onChange={onChangePlotLineStyle}
              >
                {
                  lineStyleList.map(ls => (
                    <MenuItem value={ls.spec} key={`plot-line-style-selector-${ls.label}`}>{ls.label}</MenuItem>
                  ))
                }
              </Select>
              <TextField
                required
                size="small"
                type="number"
                id="plot-line-width"
                label="Line width"
                defaultValue={plot.lineWidth}
                onBlur={setPlotLineWidth}
              />
            </Stack>
          </Stack>
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default PlotSettings;