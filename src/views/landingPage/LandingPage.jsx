import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import { ProjectList } from '../../components/project/projectList/ProjectList';
import { Searcher } from '../../components/searcher/Searcher';
import './LandingPage.css'

function LandingPage() {
    return (
        <div className='grid-container'> 
            <div>
                <Navbar />
            </div>
            <div className='flex'>
                <div className='flex-inside-searcher'>
                    <Searcher />
                </div>
                <div className='flex-inside'>
                    <ProjectList id="1" type="Educación" title="Ingeniería Sin Fronteras" description="Ingeniería Sin Fronteras Chile es una fundación sin fines de lucro, que busca co-crear soluciones sostenibles desde la Ingeniería Humanitaria." daysAgo="5" />
                </div>
                <div className='flex-inside'>
                    <ProjectList id="2" type="Medioambiente" title="Fundación Reciclaje Inclusivo" description="Fundación Reciclaje Inclusivo es un colectivo de profesionales con amplia trayectoria en el ámbito de la gestión integral de residuos y el reciclaje inclusivo en Chile y Latinoamérica." daysAgo="12" />
                </div>
            </div>
            
        </div>
    )
}

export default LandingPage;
