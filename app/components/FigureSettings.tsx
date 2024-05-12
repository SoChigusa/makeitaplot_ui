import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FocusEventHandler, useState } from "react";
import { checkPositiveNumber } from "../utils/alertUtils";
import { Fig } from "../class/settings";

const FigureSettings = ({ fig }: { fig: Fig }) => {
  const [specFigSize, setSpecFigSize] = useState<boolean>(fig.sizeSpecify);
  const [specFigTitle, setSpecFigTitle] = useState<boolean>(fig.titleSpecify)

  const onChangeSpecSize = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecFigSize(event.target.checked);
  };

  const setFigureWidth: FocusEventHandler<HTMLInputElement> = event => {
    fig.size[0] = checkPositiveNumber({
      event,
      type: 'float',
      vCurrent: fig.size[0],
      label: 'Figure width'
    });
  };

  const setFigureHeight: FocusEventHandler<HTMLInputElement> = event => {
    fig.size[1] = checkPositiveNumber({
      event,
      type: 'float',
      vCurrent: fig.size[1],
      label: 'Figure height'
    });
  };

  const onChangeSpecTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecFigTitle(event.target.checked);
  };

  const setFigureTitle: FocusEventHandler<HTMLInputElement> = event => {
    const title: string = event.currentTarget.value;
    fig.title = title;
  };

  const setFigureTitleSize: FocusEventHandler<HTMLInputElement> = event => {
    fig.titleSize = checkPositiveNumber({
      event,
      type: 'int',
      vCurrent: fig.titleSize,
      label: 'Title size'
    });
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="figure-settings"
        id="figure-settings-header"
      >
        Figure Settings
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row" alignItems="center">
              <FormControlLabel
                control={<Checkbox
                  checked={specFigSize}
                  onChange={onChangeSpecSize}
                />}
                label="Specify figure size"
              />
              <TextField
                required
                size="small"
                id="fig-width"
                label="Width"
                disabled={!specFigSize}
                defaultValue={fig.size[0]}
                onBlur={setFigureWidth}
              />
              <Typography variant="body1">
                x
              </Typography>
              <TextField
                required
                size="small"
                id="fig-height"
                label="Height"
                disabled={!specFigSize}
                defaultValue={fig.size[1]}
                onBlur={setFigureHeight}
              />
              <Typography variant="body1">
                (in unit of 100px)
              </Typography>
            </Stack>
            <Stack spacing={2} direction="row">
              <FormControlLabel
                control={<Checkbox
                  checked={specFigTitle}
                  onChange={onChangeSpecTitle}
                />}
                label="Specify figure title"
              />
              <TextField
                required
                size="small"
                sx={{ width: '360px' }}
                id="fig-title"
                label="Plot title"
                disabled={!specFigTitle}
                defaultValue={fig.title}
                onBlur={setFigureTitle}
              />
              <TextField
                required
                size="small"
                type="number"
                id="fig-title-size"
                label="Title size"
                disabled={!specFigTitle}
                defaultValue={fig.titleSize}
                onBlur={setFigureTitleSize}
              />
            </Stack>
          </Stack>
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  )
};

export default FigureSettings;