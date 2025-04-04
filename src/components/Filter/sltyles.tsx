/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSlider from 'react-slider';
import styled from 'styled-components';

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 2px;
  position: relative;
`;

const StyledThumb = styled.div`
  position: absolute;
  top: -8px;
  height: 20px;
  line-height: 20px;
  width: 20px;
  text-align: center;
  background-color: #fff;
  border: 2px solid #5A9BFE;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
`;

export const Thumb = (props: any) => {
  const key = props.key;
  delete props.key;
  return <StyledThumb key={key} {...props}></StyledThumb>
};

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props: any) => (props.$index === 2 ? '#d9d9d9' : props.$index === 1 ? '#5A9BFE' : '#ddd')};
  border-radius: 999px;
`;

export const Track = (props: any, state: any) => {
  const key = props.key;
  delete props.key;
  // very strange $ shit, 
  // i dont quite understand how it works
  // but its better stay there
  return <StyledTrack key={key} {...props} $index={state.index} />
};