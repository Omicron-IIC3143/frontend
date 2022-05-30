import React from 'react';
import Navbar from '../../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import './ProjectShow.css'
import imageIngSinFront from './ingSinFronteras.jpeg'
import imageRecInc from './reciclajeInclusivo.jpeg'

import { ButtonFinancing } from '../../../components/project/projectShow/buttons/buttonFinancing/ButtonFinancing';
import { ButtonSharing } from '../../../components/project/projectShow/buttons/buttonSharing/ButtonSharing';
import { ButtonContacting } from '../../../components/project/projectShow/buttons/buttonContacting/ButtonContacting';
import { ProjectImage } from '../../../components/project/projectShow/projectImage/ProjectImage';
import { PostulantDescription } from '../../../components/project/projectShow/postulantDescription/PostulantDescription';
import { ProjectDescription } from '../../../components/project/projectShow/fullDescriptionOfProject/FullDescriptionOfProject';
import { FinancingInformation } from '../../../components/project/projectShow/financingInfo/FinancingInfo';

var educationProject = {
    'title': 'Ingeniería Sin Fronteras',
    'description': 'Ingeniería Sin Fronteras Chile es una fundación sin fines de lucro, que busca co-crear soluciones sostenibles desde la Ingeniería Humanitaria.',
    'descriptionOfPostulant': 'Martín Sánchez es un Ingeniero UC encargado de fomentar distintas vías de financiamiento para los proyectos de vivienda de Ingeniería Sin Fronteras. ',
    'currentAmount': 4000000,
    'goalAmount': 5000000,
    'type': 'Educación',
    'image': imageIngSinFront,
}

var reciclying = {
    'title': 'Fundación Reciclaje Inclusivo',
    'description': 'Fundación Reciclaje Inclusivo es un colectivo de profesionales con amplia trayectoria en el ámbito de la gestión integral de residuos y el reciclaje inclusivo en Chile y Latinoamérica.',
    'descriptionOfPostulant': 'Felipe García es un Ingeniero UC que lleva 5 años liderando proyectos de medioambiente junto a la Fundación Reciclaje Inclusivo.',
    'currentAmount': 1000000,
    'goalAmount': 2000000,
    'type': 'Medioambiente',
    'image': imageRecInc,
}

var projects = {
    "1": educationProject,
    "2": reciclying,
  };

function ShowProject() {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
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
          .then((response) => {
            if (!response.ok) {
              setError(true);
              return null;
            }
            return response.json();
          })
          .then((data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(
            data,
            (_error, publicationData) => setPubli(publicationData),
          ))
          .catch(() => setError(true))
          .finally(() => setLoading(false));
      }, []);


    return (
        <div>
            <div className='grid-container'> 
                <div>
                    <Navbar />
                </div>
                <div className='flex'>
                    <div className='rowImageAndDescription'>
                        <ProjectImage title={projects[id]['title']} image={projects[id]['image']} />
                        <PostulantDescription description={projects[id]['descriptionOfPostulant']} />
                    </div>
                    <ProjectDescription description={projects[id]['description']} /> 
                    <FinancingInformation current_financing={projects[id]['currentAmount']} goal_financing={projects[id]['goalAmount']} />
                    <div>
                        <ButtonFinancing /> 
                        {' '}
                        <ButtonSharing />
                        {' '}
                        <ButtonContacting />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowProject;