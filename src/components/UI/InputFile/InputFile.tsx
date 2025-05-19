import { Button, ButtonProps } from '@mui/material';
import React, { InputHTMLAttributes, useState } from 'react';

type InputFileProps = {
  text?: string
  inputProps: InputHTMLAttributes<HTMLInputElement>,
  buttonProps?: ButtonProps,
}

const InputFile = (props: InputFileProps) => {
  const { text = 'Загрузить файл', inputProps, buttonProps } = props;
  const [fileName, setFileName] = useState(text);

  return (
    <Button size='large' variant='contained' component="label" {...buttonProps}>
      {/* {getValues('file') ? getValues('file')[0]?.name : 'Загрузить изображение'} */}
      {fileName}
      <input
        // id='load-image'
        // {...register('file')}
        // type="file"
        // hidden
        // onChange={(e) => {
        //   setFileName(e.target.value.split('\\').pop() || 'загрузить')
        //   register('file').onChange(e);
        // }}
        {...inputProps}
        onChange={(e) => {
          setFileName(e.target.value.split('\\').pop() || text)
          if (inputProps?.onChange) {
            inputProps?.onChange(e);
          }
        }}
        type="file"
        hidden
      />
    </Button>
  );
};

export default InputFile;