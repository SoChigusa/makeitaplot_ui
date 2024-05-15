'use client';

import { useState, useRef, MouseEventHandler } from "react";
// import type { PutBlobResult } from "@vercel/blob";
import { Alert, AppBar, Backdrop, Box, CircularProgress, Container, FormControl, IconButton, Input, Slide, SlideProps, Snackbar, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import FigureSettings from "./components/FigureSettings";
import PlotSettings from "./components/PlotSettings";
import AxisSettings from "./components/AxisSettings";
import TicksSettings from "./components/TicksSettings";
import { Settings } from "./class/settings";
import Image from "next/image";
import ImageIcon from '@mui/icons-material/Image';
import SourceIcon from '@mui/icons-material/Source';
import { CoffeeMakerOutlined, PictureAsPdf } from "@mui/icons-material";

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    open: false,
    message: ""
  });

  // settings
  let defaultSettings = new Settings();
  const [settings, setSettings] = useState(defaultSettings);

  const handleClickPlot: MouseEventHandler<HTMLButtonElement> = async (event) => {
    settings.imageType = 'png';
    handlePlot(event);
  };

  const handleClickPNG: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const fileList = inputFileRef.current?.files;
    if (!fileList || fileList.length === 0) {
      setError({
        open: true,
        message: 'No file selected'
      });
    } else if (imageUrl === '') {
      setError({
        open: true,
        message: 'No plot generated'
      });
    } else {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = fileList[0].name.split('.')[0] + '.png';
      link.click();
    }
  };

  const handleClickPDF: MouseEventHandler<HTMLButtonElement> = async (event) => {
    settings.imageType = 'pdf';
    handlePlot(event);
  };

  const handlePlot: MouseEventHandler<HTMLButtonElement> = async (event) => {
    setLoading(true);
    event.preventDefault();

    // File check
    const fileList = inputFileRef.current?.files;
    if (!fileList || fileList.length === 0) {
      setError({
        open: true,
        message: 'No file selected'
      });
      setLoading(false);
      return;
    }

    // --------------- source code for vercel blob ---------------
    // const [blob, setBlob] = useState<PutBlobResult | null>(null);

    // // File upload
    // const file = inputFileRef.current.files[0];
    // const response = await fetch(
    //   `/api/upload?filename=${file.name}`,
    //   {
    //     method: 'POST',
    //     body: file,
    //   },
    // );

    // // Preserve file info
    // const newBlob = (await response.json()) as PutBlobResult;
    // setBlob(newBlob);

    // // Plot
    // await fetch('https://makeitaplot-api.vercel.app/plot-vercel-blob?url=${newBlob.downloadUrl}', {
    //   method: 'GET'
    // }).then(res => res.blob())
    //   .then(obj => {
    //     const url = URL.createObjectURL(obj);
    //     setImageUrl(url);
    //   });

    // Plot data
    const formData = new FormData();
    formData.append('plot_data', fileList[0]);

    // Settings
    const blob = new Blob([JSON.stringify(settings)], { type: 'application/json' });
    formData.append('settings', blob);

    // await fetch('http://localhost:3001/plot', {
    await fetch('https://makeitaplot-api.vercel.app/plot', {
      method: 'POST',
      body: formData
    }).then(res => res.blob())
      .then(obj => {
        const url = URL.createObjectURL(obj);
        if (settings.imageType === 'png') {
          setImageUrl(url);
        } else if (settings.imageType === 'pdf') {
          const link = document.createElement("a");
          link.href = url;
          link.download = fileList[0].name.split('.')[0] + '.pdf';
          link.click();
        }
      });

    setLoading(false);
  };

  const handleSource: MouseEventHandler<HTMLButtonElement> = async (event) => {
    setLoading(true);
    event.preventDefault();

    // input file name
    const formData = new FormData();
    const fileList = inputFileRef.current?.files;
    if (!fileList || fileList.length === 0) {
      setError({
        open: true,
        message: 'No file selected'
      });
      setLoading(false);
      return;
    } else {
      formData.append('file_name', fileList[0].name);
    }

    // settings
    const blob = new Blob([JSON.stringify(settings)], { type: 'application/json' });
    formData.append('settings', blob);

    // await fetch('http://localhost:3001/source', {
    await fetch('https://makeitaplot-api.vercel.app/source', {
      method: 'POST',
      body: formData
    }).then(res => res.blob())
      .then(obj => {
        const url = URL.createObjectURL(obj);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileList[0].name.split('.')[0]}.py`;
        link.click();
      });

    setLoading(false);
  }

  // error snackbar
  const SlideTransition = (props: SlideProps) => {
    return <Slide {...props} direction="up" />;
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setError({
      open: false,
      message: ''
    });
  };

  return (
    <Box>
      <AppBar position='static' sx={{ marginBottom: 1 }}>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              MakeItAPlot!
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Stack spacing={2}>
          <Box display='flex' justifyContent='center'>
            {
              imageUrl == '' ?
                <Image src='/sample-plot.png' alt='Sample Plot' width={600} height={450} /> :
                <Image src={imageUrl} alt='Generated Plot' width={100 * settings.fig.size[0]} height={100 * settings.fig.size[1]} />
            }
          </Box>
          <FormControl>
            <Stack spacing={1} direction="row" sx={{ marginX: 'auto' }}>
              <Input
                name="file"
                inputRef={inputFileRef}
                type="file"
                required
              />
              <Tooltip title="Plot" arrow>
                <IconButton
                  aria-label="Plot"
                  color="primary"
                  onClick={handleClickPlot}
                >
                  <CoffeeMakerOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download png image" arrow>
                <IconButton
                  aria-label="Download png"
                  color="primary"
                  onClick={handleClickPNG}
                >
                  <ImageIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download pdf image" arrow>
                <IconButton
                  aria-label="Generate and download pdf"
                  color="primary"
                  onClick={handleClickPDF}
                >
                  <PictureAsPdf />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download matplotlib source" arrow>
                <IconButton
                  aria-label="Download matplotlib source"
                  color="primary"
                  onClick={handleSource}
                >
                  <SourceIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </FormControl>
          <Box>
            <FigureSettings fig={settings.fig} />
            <PlotSettings plots={settings.plots} />
            <AxisSettings axis={settings.xAxis} />
            <AxisSettings axis={settings.yAxis} />
            <TicksSettings ticks={settings.ticks} />
          </Box>
          <Box></Box>
        </Stack>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
        <Snackbar
          open={error.open}
          onClose={handleCloseSnackbar}
          TransitionComponent={SlideTransition}
          key="error-snackbar"
          autoHideDuration={3000}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
