import React from 'react';
import FontAwesome from 'react-fontawesome';

export const Spinner = (() => {
  return (
    <div className="mt-50 text-center">
      <FontAwesome
        className="spinner"
        name="spinner"
        size="2x"
        spin
      />
    </div>
  )
})
