'use client';

import { useState, useRef, MouseEventHandler } from "react";
import type { PutBlobResult } from "@vercel/blob";
import { AppBar, Backdrop, Box, Button, CircularProgress, Container, FormControl, Input, Stack, Toolbar, Typography } from "@mui/material";

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClickPlot: MouseEventHandler<HTMLButtonElement> = async (event) => {
    setLoading(true);
    event.preventDefault();

    // File check
    const fileList = inputFileRef.current?.files;
    if (!fileList) {
      throw new Error('No file selected');
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

    // Plot
    const formData = new FormData();
    formData.append('plot_data', fileList[0]);
    await fetch('https://makeitaplot-api.vercel.app/plot', {
      method: 'POST',
      body: formData
    }).then(res => res.blob())
      .then(obj => {
        const url = URL.createObjectURL(obj);
        setImageUrl(url);
      });

    setLoading(false);
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
                <img src='sample-plot.png' alt='Sample Plot' /> :
                <img src={imageUrl} alt='Generated Plot' />
            }
          </Box>
          <FormControl>
            <Stack spacing={2} direction="row" sx={{ marginX: 'auto' }}>
              <Input
                name="file"
                inputRef={inputFileRef}
                type="file"
                required
              />
              <Button
                variant="contained"
                onClick={handleClickPlot}
              >
                Plot
              </Button>
            </Stack>
          </FormControl>
        </Stack>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
      </Container>
    </Box>
  );
}
