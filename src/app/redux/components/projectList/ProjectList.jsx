import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export function ProjectList({type, title, description, daysAgo}) {
    return (
        <Card className="text-center">
        <Card.Header> Proyecto de {type} </Card.Header>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                {description}
            </Card.Text>
            <Button variant="primary">Ver en más detalle</Button>
        </Card.Body>
        <Card.Footer className="text-muted">Hace {daysAgo} días</Card.Footer>
        </Card>
    )
}

