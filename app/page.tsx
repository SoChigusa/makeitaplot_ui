'use client';

import { useState, useRef, MouseEventHandler } from "react";
import type { PutBlobResult } from "@vercel/blob";
import { AppBar, Backdrop, Box, Button, CircularProgress, Container, FormControl, Input, Stack, Toolbar, Typography } from "@mui/material";

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClickPlot: MouseEventHandler<HTMLButtonElement> = async (event) => {
    setLoading(true);
    event.preventDefault();

    // File check
    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }

    // File upload
    const file = inputFileRef.current.files[0];
    const response = await fetch(
      `/api/upload?filename=${file.name}`,
      {
        method: 'POST',
        body: file,
      },
    );

    // Preserve file info
    const newBlob = (await response.json()) as PutBlobResult;
    setBlob(newBlob);

    console.log(`https://makeitaplot-api.vercel.app/plot?url=${newBlob.downloadUrl}`);

    // Plot
    await fetch(`https://makeitaplot-api.vercel.app/plot?url=${newBlob.downloadUrl}`, {
      method: 'GET'
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
            <img src={imageUrl} alt='Generated Plot' />
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
