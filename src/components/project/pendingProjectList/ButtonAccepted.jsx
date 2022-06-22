import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export function ButtonAccepted({ id }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState('');

  const updateState = async () => {
    const values = {
      currentState: 'accepted',
    };
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.token}`,
        'Sec-Fetch-Mode': 'cors',
      },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      navigate('/projects/pendings');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Button variant="primary" onClick={updateState} className="update-button">
      Aprobar proyecto
    </Button>
  );
}

export default ButtonAccepted;
