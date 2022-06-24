import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import './ProjectShow.css';
import Loading from '../../../components/loading/Loading';
// import imageIngSinFront from './ingSinFronteras.jpeg';
// import imageRecInc from './reciclajeInclusivo.jpeg';
import useAuth from '../../../hooks/useAuth';
import numberOfDays from '../../../hooks/numberOfDays';
import ButtonBack from '../../../components/buttons/buttonBack/ButtonBack';
import ButtonSharing from '../../../components/project/projectShow/buttons/buttonSharing/ButtonSharing';
import ButtonContacting from '../../../components/project/projectShow/buttons/buttonContacting/ButtonContacting';
import ButtonReports from '../../../components/report/buttonReports/ButtonProjectReports';
import ProjectImage from '../../../components/project/projectShow/projectImage/ProjectImage';
import Deadline from '../../../components/project/projectShow/deadline/Deadline';
import ProjectDescription from '../../../components/project/projectShow/fullDescriptionOfProject/FullDescriptionOfProject';
import FinancingInformation from '../../../components/project/projectShow/financingInfo/FinancingInfo';
import DeleteProject from '../../../components/project/projectShow/deleteProject/DeleteProject';
import FinanceForm from '../../../components/project/projectShow/financeForm/FinanceForm';
import UpdateButton from '../../../components/project/projectShow/buttons/updateButton/UpdateButton';

function ShowProject() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [project, setProject] = useState([]);
  const [projectUser, setProjectUser] = useState([]);
  // const [user, setUser] = useState([]);
  const [currentAmount, setCurrentAmount] = useState([]);
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
        setCurrentAmount(respuesta.currentAmount);
        return respuesta;
      })
      .then(async (projectResponse) => {
        if (currentUser) {
          fetch(`${process.env.REACT_APP_API_URL}/users/${projectResponse?.userId}`, requestOptions)
            .then(async (response) => {
              if (!response.ok) {
                setError(true);
                return null;
              }
              const respuesta = await response.json();
              setProjectUser(respuesta);
              return project;
            })
            .catch(() => setError(true));
        }
      })
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  if (currentUser) {
    if (currentUser?.isAdmin) {
      if (loading) { return (<Loading />); }
      return (
        <div>
          <div className="grid-container  ">
            <div>
              <Navbar />
            </div>

            <div className="page-wrapper">
              <h1 className="titleProjectShow title-color width-50">
                {`${project.name}`}
              </h1>
              {error ? (
                <div className="width-50">
                  <h2>
                    Error
                    {error}
                  </h2>
                </div>
              ) : (
                <>
                  <div className="display-flex-row width-50">
                    <ProjectImage company={project?.company} image={project?.pictureUrl} />
                    <Deadline date={project?.date} state={project?.currentState} className="bg-dark-color" />
                  </div>
                  <ProjectDescription className="width-50" description={project?.description} />
                  <FinancingInformation
                    className="width-50 bg-dark-color"
                    currentFinancing={project?.currentAmount}
                    goalFinancing={project?.goalAmount}
                  />
                  <DeleteProject project={project} />
                  <UpdateButton id={project.id} />
                  <div className="page-buttons width-50 margin-bottom-s">
                    <ButtonBack />
                    <div className="page-interaction-buttons">
                      {currentUser.id != project.userId ? (
                        <ButtonContacting
                          visitUser={currentUser}
                          project={project}
                          projectUser={projectUser}
                        />
                      ) : (<> </>)}
                      <ButtonSharing />
                      {numberOfDays(project?.date) < 0 && (project?.currentState != 'pending' && project?.currentState != 'rejected') ? (
                        <ButtonReports
                          id={project?.id}
                          projectName={project?.name}
                          userId={project?.userId}
                        />
                      ) : null}
                    </div>
                  </div>

                  {currentUser.id != project?.userId
                  && numberOfDays(project?.date) > 0
                  && project?.currentState == 'accepted' ? (
                    <div className="width-50">
                      <div className="title-finance-project title-color">
                        <h1>Acá puedes aportar al financiamiento del proyecto</h1>
                      </div>
                      <div>
                        <FinanceForm
                          currentAmount={currentAmount}
                          setCurrentAmount={setCurrentAmount}
                        />
                      </div>
                    </div>
                    ) : (<> </>)}

                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (loading) { return (<Loading />); }
    return (
      <div>
        <div className="grid-container  ">
          <div>
            <Navbar />
          </div>

          <div className="page-wrapper">
            <h1 className="titleProjectShow title-color width-50">
              {`${project.name}`}
            </h1>
            {error ? (
              <div className="width-50">
                <h2>
                  Error
                  {error}
                </h2>
              </div>
            ) : (
              <>
                <div className="display-flex-row width-50">
                  <ProjectImage company={project?.company} image={project?.pictureUrl} />
                  <Deadline date={project?.date} state={project?.currentState} className="bg-dark-color" />
                </div>
                <ProjectDescription className="width-50" description={project?.description} />
                <FinancingInformation
                  className="width-50 bg-dark-color"
                  currentFinancing={project?.currentAmount}
                  goalFinancing={project?.goalAmount}
                />

                <div className="page-buttons width-50 margin-bottom-s">

                  <div className="page-interaction-buttons">

                    {currentUser.id == project.userId ? (
                      <>
                        <DeleteProject project={project} />
                        <UpdateButton id={project.id} />
                      </>
                    ) : (
                      <ButtonContacting
                        visitUser={currentUser}
                        project={project}
                        projectUser={projectUser}
                      />
                    )}
                    <ButtonSharing />
                    {numberOfDays(project?.date) < 0 && (project?.currentState != 'pending' && project?.currentState != 'rejected') ? (
                      <ButtonReports
                        id={project?.id}
                        projectName={project?.name}
                        userId={project?.userId}
                      />
                    ) : null}
                    <ButtonBack />
                  </div>
                </div>

                {currentUser.id != project?.userId
                  && numberOfDays(project?.date) > 0 ? (
                    <div className="width-50">
                      <div className="title-finance-project title-color">
                        <h1>Acá puedes aportar al financiamiento del proyecto</h1>
                      </div>
                      <div>
                        <FinanceForm
                          currentAmount={currentAmount}
                          setCurrentAmount={setCurrentAmount}
                        />
                      </div>
                    </div>
                  ) : (<> </>)}

              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (project?.currentState != 'pending' && project?.currentState != 'rejected') {
    if (loading) { return (<Loading />); }
    return (
      <div>
        <div className="grid-container  ">
          <div>
            <Navbar />
          </div>

          <div className="page-wrapper">
            <h1 className="titleProjectShow title-color width-50">
              {`${project?.name}`}
            </h1>
            {error ? (
              <div className="width-50">
                <h2>
                  Error
                  {error}
                </h2>
              </div>
            ) : (
              <>
                <div className="display-flex-row width-50">
                  <ProjectImage company={project?.company} image={project?.pictureUrl} />
                  <Deadline date={project?.date} state={project?.currentState} className="bg-dark-color" />
                </div>
                <ProjectDescription className="width-50" description={project?.description} />
                <FinancingInformation
                  className="width-50 bg-dark-color"
                  currentFinancing={project?.currentAmount}
                  goalFinancing={project?.goalAmount}
                />
                <div className="page-buttons width-50 margin-bottom-s">
                  <ButtonBack />
                  <div className="page-interaction-buttons">
                    <ButtonReports
                      id={project?.id}
                      projectName={project?.name}
                      userId={project?.userId}
                    />
                    <ButtonSharing />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div>
        <Navbar />
      </div>
      <h1 className="unauthorizedMessageMyProjects">Este proyecto aún está en revisión o bien, fue rechazado. </h1>
    </div>
  );
}

export default ShowProject;
