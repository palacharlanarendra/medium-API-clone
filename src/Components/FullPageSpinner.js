import React from 'react';
function FullPageSpinner() {
  return (
    <>
      <div
        className='bouncing-loader'
        style={{ height: '100vh', marginTop: '30vh' }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default FullPageSpinner;
