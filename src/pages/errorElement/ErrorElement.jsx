import React from 'react';
import { Link } from "react-router-dom";

const ErrorElement = () => {

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Error 404</h1>
      <p style={styles.message}>Oops! Something went wrong. Page Not Found.</p>
      <Link to={'/'}><button className="btn btn-error mt-4">Back Home</button></Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#FF3333', 
  },
  message: {
    fontSize: '1.2rem',
    color: '#666', 
  },
};

export default ErrorElement;
