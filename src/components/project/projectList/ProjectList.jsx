import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';


export function ProjectList({id, type, title, description, daysAgo}) {
    return (
        <Card className="text-center">
        <Card.Header> Proyecto de {type} </Card.Header>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                {description}
            </Card.Text>
            <Button variant="primary" href={`/projects/${id}`}>Ver en más detalle</Button>
            {/* <Link to={`/projects/${id}`}>Ver en más detalle</Link> */}
        </Card.Body>
        <Card.Footer className="text-muted">Hace {daysAgo} días</Card.Footer>
        </Card>
    )
}

