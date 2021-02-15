import React from 'react';
import './Scroll.scss'

type Props = {
  children?: JSX.Element
}

const Scroll = (props: Props) => {
  return (
    <div className='modal-scroll-box'>
      {props.children}
    </div>
  );
};

export default Scroll;