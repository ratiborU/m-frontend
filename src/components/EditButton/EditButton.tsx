'use client'
import React from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

type EditButtonProps = {
  path: string
}

const EditButton = (props: EditButtonProps) => {
  const { path = "#" } = props;
  const router = useRouter()
  return (
    <IconButton onClick={() => { router.push(path) }}>
      <BorderColorIcon />
    </IconButton>
  );
};

export default EditButton;