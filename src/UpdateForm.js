import React, { Component } from 'react';

const UpdateForm = ({zipcode, handleUpdate}) => {
  return (
    <div className="form">
      <form onSubmit={handleUpdate}>
        <div className="zipcode-input-block">
          <p className="zipcode-label">Zip Code:</p>
          <input className="text-input" type="text" name="zipcode" placeholder={zipcode}></input>
        </div>
        <input className="submit-button" type="submit" value="Update"></input>
      </form>
    </div>
  );
}

export default UpdateForm;