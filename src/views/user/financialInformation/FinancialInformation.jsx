import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import convertMoneyToString from '../../../hooks/convertNumber';
import Navbar from '../../../components/navbar/Navbar';
import Loading from '../../../components/loading/Loading';
// import DepositButton from '../../../components/user/buttons/depositButton/DepositButton';
import DepositForm from '../../../components/user/depositForm/DepositForm';
import './FinancialInformation.css';

function FinancialInformation() {
  const { currentUser } = useAuth();
  const { id } = useParams();
  // const [user, setUser] = useState([]);
  const [money, setMoney] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        // setUser(respuesta);
        setMoney(respuesta.money);
        return respuesta;
      })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (currentUser?.isAdmin == true) {
    return (
      (loading == true) ? (
        <Loading />) : (
          <div>
            <div className="grid-container  ">
              <div>
                <Navbar />
              </div>
              <div className="flex-financial-info">

                <div className="card-financial-info">
                  {currentUser?.id == id ? (
                    <h3 className="title-financial-info">
                      Tu saldo actual
                    </h3>
                  ) : (
                    <h3 className="title-financial-info">
                      Saldo actual del usuario con id
                      {' '}
                      {` ${id}`}
                    </h3>
                  )}
                  {currentUser?.id == id ? (
                    <h3 className="sub-title-financial-info">
                      [Mi información financiera]
                    </h3>
                  ) : (
                    <h3 className="sub-title-financial-info">
                      [Información financiera del usuario]
                    </h3>
                  )}
                  <h3 className="center-financial-info">
                    <b>
                      {'$ '}
                      {convertMoneyToString(money)}
                      {' '}
                    </b>
                  </h3>
                </div>
                {currentUser?.id == id ? (
                  <div className="card-deposit">
                    <DepositForm money={money} setMoney={setMoney} />
                  </div>
                ) : (
                  <> </>
                )}
              </div>
            </div>
          </div>
      ));
  }
  if (currentUser?.id == id) {
    return (
      (loading == true) ? (
        <Loading />) : (
          <div>
            <div className="grid-container  ">
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
                    {error ? (
                      <div className="flex-inside">
                        <h2>
                          Error
                          {error.errors}
                        </h2>
                      </div>
                    ) : (
                      <b>
                        {'$ '}
                        {convertMoneyToString(money)}
                        {' '}

                      </b>
                    )}
                  </h3>
                </div>
                <div className="card-deposit">
                  <DepositForm money={money} setMoney={setMoney} />
                </div>
              </div>
            </div>
          </div>
      ));
  }
  return (
    <div>
      <div className="grid-container  ">
        <div>
          <Navbar />
        </div>
        <h1 className="unauthorizedMessage">No estás autorizado para ver la información financiera de otro usuario. </h1>
      </div>
    </div>
  );
}

export default FinancialInformation;
