'use client'
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

type AddButtonProps = {
  path: string
}

const AddButton = (props: AddButtonProps) => {
  const { path = "#" } = props;
  const router = useRouter()
  return (
    <IconButton onClick={() => { router.push(path) }}>
      <AddIcon />
    </IconButton>
  );
};

export default AddButton;