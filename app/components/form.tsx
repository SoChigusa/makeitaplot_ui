import { PutBlobResult, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { Dispatch, SetStateAction } from 'react';

type ChildProps = {
  setBlob: Dispatch<SetStateAction<PutBlobResult | null | undefined>>;
};

export async function Form(props: ChildProps) {
  const uploadImage = async (formData: FormData) => {
    'use server';
    const imageFile = formData.get('image') as File;
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    });
    revalidatePath('/');
    props.setBlob(blob);
  };

  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button>Upload</button>
    </form>
  );
}