import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import './ProjectShow.css';
import Loading from '../../../components/loading/Loading';
// import imageIngSinFront from './ingSinFronteras.jpeg';
// import imageRecInc from './reciclajeInclusivo.jpeg';
import useAuth from '../../../hooks/useAuth';

import ButtonFinancing from '../../../components/project/projectShow/buttons/buttonFinancing/ButtonFinancing';
import ButtonSharing from '../../../components/project/projectShow/buttons/buttonSharing/ButtonSharing';
import ButtonContacting from '../../../components/project/projectShow/buttons/buttonContacting/ButtonContacting';
import ButtonBackShowProject from '../../../components/project/projectShow/buttons/buttonBack/ButtonBackShowProject';
import ProjectImage from '../../../components/project/projectShow/projectImage/ProjectImage';
import Deadline from '../../../components/project/projectShow/deadline/Deadline';
import ProjectDescription from '../../../components/project/projectShow/fullDescriptionOfProject/FullDescriptionOfProject';
import FinancingInformation from '../../../components/project/projectShow/financingInfo/FinancingInfo';

function ShowProject() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [project, setProject] = useState([]);
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
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          setError(true);
          return null;
        }
        const respuesta = await response.json();
        setProject(respuesta);
        return respuesta;
      })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <div className="grid-container  ">
        <div>
          <Navbar />
        </div>

        <div className="flex-project-show">
          <div>
            <h1 className="titleProjectShow">
              Proyecto en particular
            </h1>
          </div>
          {error ? (
            <div className="flex-inside">
              <h2>
                Error
                {error}
              </h2>
            </div>
          ) : (
            <>
              <div className="rowImageAndDescription">
                <ProjectImage title={project.name} image={project.pictureUrl} />
                <Deadline date={project.date} />
              </div>
              <ProjectDescription description={project.description} />
              <FinancingInformation
                currentFinancing={project.currentAmount}
                goalFinancing={project.goalAmount}
              />
              <div>
                <ButtonFinancing />
                <ButtonSharing />
                <ButtonContacting />
                <ButtonBackShowProject />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowProject;
