import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FocusEventHandler, useState } from "react";
import { checkNumber, checkPositiveNumber } from "../utils/alertUtils";
import { Axis } from "../class/settings";

const AxisSettings = ({ axis }: { axis: Axis }) => {
  const [specLim, setSpecLim] = useState<boolean>(axis.limSpecify);
  const [specLogScale, setSpecLogScale] = useState<boolean>(axis.logScale);

  const onChangeSpecLim = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecLim(event.target.checked);
    axis.limSpecify = event.target.checked;
  };

  const setAxisLimLower: FocusEventHandler<HTMLInputElement> = event => {
    const val: string = event.currentTarget.value;
    const l: number = parseFloat(val);
    axis.lim[0] = checkNumber({
      event,
      type: 'float',
      vCurrent: axis.lim[0],
      label: `${axis.getID()}-axis lower limit`
    });
  };

  const setAxisLimUpper: FocusEventHandler<HTMLInputElement> = event => {
    const val: string = event.currentTarget.value;
    const u: number = parseFloat(val);
    axis.lim[1] = checkNumber({
      event,
      type: 'float',
      vCurrent: axis.lim[1],
      label: `${axis.getID()}-axis upper limit`
    });
  };

  const onChangeSpecLogScale = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecLogScale(event.target.checked);
    axis.logScale = event.target.checked;
  };

  const setAxisLabel: FocusEventHandler<HTMLInputElement> = event => {
    axis.label = event.currentTarget.value;
  };

  const setAxisLabelSize: FocusEventHandler<HTMLInputElement> = event => {
    axis.labelSize = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: axis.labelSize,
      label: `${axis.getID()}-axis label size`
    });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${axis.getID()}-axis-settings`}
        id={`${axis.getID()}-axis-settings-header`}
      >
        {axis.getID()}-axis Settings
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row" alignItems="center">
              <FormControlLabel
                control={<Checkbox
                  checked={specLim}
                  onChange={onChangeSpecLim}
                />}
                label={`Specify limit`}
              />
              <TextField
                required
                size="small"
                id={`${axis.getID()}-axis-lim-lower`}
                label="Lower limit"
                disabled={!specLim}
                defaultValue={axis.lim[0]}
                onBlur={setAxisLimLower}
              />
              <Typography variant="body1">
                %%
              </Typography>
              <TextField
                required
                size="small"
                id={`${axis.getID()}-axis-lim-upper`}
                label="Upper limit"
                disabled={!specLim}
                defaultValue={axis.lim[1]}
                onBlur={setAxisLimUpper}
              />
            </Stack>
            <FormControlLabel
              control={<Checkbox
                checked={specLogScale}
                onChange={onChangeSpecLogScale}
              />}
              label={`Log scale`}
            />
            <Stack spacing={2} direction="row" alignItems="center">
              <TextField
                required
                size="small"
                id={`${axis.getID()}-axis-label`}
                label="Label"
                defaultValue={axis.label}
                onBlur={setAxisLabel}
              />
              <TextField
                required
                size="small"
                type="number"
                id={`${axis.getID()}-axis-label-size`}
                label="Label size"
                defaultValue={axis.labelSize}
                onBlur={setAxisLabelSize}
              />
            </Stack>
          </Stack>
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default AxisSettings;