import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, FormGroup, TextField } from "@mui/material";
import { checkPositiveNumber } from "../utils/alertUtils";
import { FocusEventHandler } from "react";
import { Ticks } from "../class/settings";

const TicksSettings = ({ ticks }: { ticks: Ticks }) => {

  const setTicksLabelSize: FocusEventHandler<HTMLInputElement> = event => {
    ticks.labelSize = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: ticks.labelSize,
      label: 'Ticks label size'
    });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='Ticks-settings'
        id='Ticks-settings-header'
      >
        Ticks Settings
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          <TextField
            required
            sx={{ width: 100 }}
            InputProps={{ inputProps: { min: 1 } }}
            size="small"
            type="number"
            id="ticks-label-size"
            label="Label size"
            defaultValue={ticks.labelSize}
            onBlur={setTicksLabelSize}
          />
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}

export default TicksSettings;