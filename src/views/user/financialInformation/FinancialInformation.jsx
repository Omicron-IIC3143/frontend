import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navbar from '../../../components/navbar/Navbar';
import Loading from '../../../components/loading/Loading';
// import DepositButton from '../../../components/user/buttons/depositButton/DepositButton';
import DepositForm from '../../../components/user/depositForm/DepositForm';
import './FinancialInformation.css';

function FinancialInformation() {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  // const [money, setMoney] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const deposit = (moneyAmount) => {
  //   useEffect(() => {
  //     setLoading(true);
  //     const requestOptions = {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${currentUser?.token}`,
  //       },
  //     };
  //     fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions)
  //       .then(async (response) => {
  //         if (!response.ok) {
  //           setError(true);
  //           return null;
  //         }
  //         const respuesta = await response.json();
  //         setUser(respuesta);
  //         return respuesta;
  //       })
  //       .catch(() => { setError(true); })
  //       .finally(() => setLoading(false));
  //   }, []);

  //   const finalMoney = user?.money + moneyAmount;
  //   setMoney(finalMoney);
  // };

  if (currentUser?.isAdmin == true) {
    useEffect(() => {
      setLoading(true);
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.token}`,
        },
      };
      fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, requestOptions)
        .then(async (response) => {
          if (!response.ok) {
            setError(true);
            return null;
          }
          const respuesta = await response.json();
          setUser(respuesta);
          return respuesta;
        })
        .catch(() => { setError(true); })
        .finally(() => setLoading(false));
    }, []);

    return (
      (loading == true) ? (
        <Loading />) : (
          <>
          </>
      ),
      (error) ? (
        <div className="flex-inside">
          <h2>
            Error
            {error}
          </h2>
        </div>
      ) : (
        <div>
          <div className="grid-container-financial-info">
            <div>
              <Navbar />
            </div>
            <div className="flex-financial-info">
              <div className="card-financial-info">
                <h3 className="title-financial-info">
                  Tu saldo actual
                </h3>
                <h3 className="sub-title-financial-info">
                  [Mi información financiera]
                </h3>
                <h3 className="center-financial-info">
                  <b>
                    {'$ '}
                    {currentUser?.money}
                    {' '}

                  </b>
                </h3>
              </div>
              <div>
                <DepositForm />
              </div>
            </div>
          </div>
        </div>
      ));
  }
  return (
    (currentUser?.id == id) ? (

      <div>
        <div className="grid-container-financial-info">
          <div>
            <Navbar />
          </div>
          <div className="flex-financial-info">
            <div className="card-financial-info">
              <h3 className="title-financial-info">
                Tu saldo actual
              </h3>
              <h3 className="sub-title-financial-info">
                [Mi información financiera]
              </h3>
              <h3 className="center-financial-info">
                <b>
                  {'$ '}
                  {currentUser?.money}
                  {' '}

                </b>
              </h3>
            </div>
            <div>
              <DepositForm />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className="grid-container-financial-info">
          <div>
            <Navbar />
          </div>
          <h1>No estás autorizado para ver la información financiera de otra persona. </h1>
        </div>
      </div>
    ));
}

export default FinancialInformation;
