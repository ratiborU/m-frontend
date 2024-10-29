import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import styles from "./editImage.module.css";

type EditImageProps = {
  src: string,
  alt: string,
  width: number,
  height: number,
  onClick: () => void
}

const EditImage = (props: EditImageProps) => {
  const { src, alt, width, height, onClick } = props;

  return (
    <div className={styles.block}>
      <Image
        className={styles.image}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
      <Button size='small' variant='outlined' onClick={onClick}>Удалить</Button>
    </div>
  );
};

export default EditImage;