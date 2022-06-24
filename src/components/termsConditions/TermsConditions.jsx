import React from 'react';
import { Link } from 'react-router-dom';
import './TermsConditions.css';

function TermsConditions() {
  return (
    <div className="card-terms-and-conditions">
      <h2>Bienvenida</h2>
      <h6>
        Bienvenido/a a
        {' '}
        <b>Social Starter</b>
        . Estos términos y condiciones describen
        las reglas y regulaciones para el uso del sitio web.
        <b> Social Starter</b>
        {' '}
        se encuentra en Vicuña Mackenna 4860, Macul.
        Al acceder a este sitio web, asumimos que aceptas estos términos y
        condiciones en su totalidad. No continúes usando el sitio web si no aceptas
        todos los términos y condiciones establecidos en esta página.
      </h6>
      <h2>Cookies</h2>
      <h6>
        Empleamos el uso de cookies. Al utilizar el sitio web de
        {' '}
        <b> Social Starter</b>
        ,
        usted acepta el uso de cookies de acuerdo con la política de privacidad de
        <b> Social Starter</b>
        . La mayoría de los modernos sitios web interactivos de hoy
        en día usan cookies para permitirnos recuperar los detalles del usuario
        para cada visita.
        Las cookies se utilizan en algunas áreas de nuestro sitio para habilitar
        la funcionalidad de esta área y la facilidad de uso para las personas que
        lo visitan. Algunos de nuestros futuros afiliados/publicitarios también
        podrán usar cookies.
      </h6>
      <h2>
        Licencia
      </h2>
      <h6>
        A menos que se indique lo contrario,
        {' '}
        <b> Social Starter</b>
        {' '}
        y/o sus licenciatarios
        les pertenecen los derechos de propiedad intelectual de todo el material
        en
        {' '}
        <b> Social Starter</b>
        .
        Todos los derechos de propiedad intelectual están reservados. Puedes ver
        y/o imprimir páginas desde
        {' '}
        <Link to="/">http://social-starter-dev.herokuapp.com</Link>
        {' '}
        para
        tu uso personal sujeto a las restricciones establecidas en estos términos
        y condiciones.
        No debes:
      </h6>

      <ul>
        <li>
          Volver a publicar material desde
          {' '}
          <Link to="/">http://social-starter-dev.herokuapp.com</Link>
          {' '}
        </li>
        <li>
          Vender, alquilar u otorgar una sub-licencia de material desde
          {' '}
          <Link to="/">http://social-starter-dev.herokuapp.com </Link>
          {' '}
        </li>
        <li>
          Reproducir, duplicar o copiar material desde
          {' '}
          <Link to="/">http://social-starter-dev.herokuapp.com </Link>
          {' '}
        </li>
        <li>
          Redistribuir contenido de
          {' '}
          <b> Social Starter</b>
          , a menos de que el contenido se haga
          específicamente para la redistribución
        </li>
      </ul>
      <h2>Aviso legal</h2>
      <h6>

        En la medida máxima permitida por la ley aplicable, excluimos todas las
        representaciones, garantías y condiciones relacionadas con nuestro sitio
        web y el uso de este sitio web (incluyendo, sin limitación, cualquier
        garantía implícita por la ley con respecto a la calidad satisfactoria,
        idoneidad para el propósito y/o el uso de cuidado y habilidad razonables).
        Nada en este aviso legal:
      </h6>
      <ul>
        <li>
          Limita o excluye nuestra o su responsabilidad por muerte o
          lesiones personales resultantes de negligencia.
        </li>
        <li>
          Limita o excluye nuestra o su responsabilidad por fraude o
          tergiversación fraudulenta.
        </li>
        <li>
          Limita cualquiera de nuestras o sus responsabilidades de
          cualquier manera que no esté permitida por la ley aplicable.
        </li>
        <li>
          Excluye cualquiera de nuestras o sus responsabilidades que
          no pueden ser excluidas bajo la ley aplicable.
        </li>
      </ul>
      <h6>
        Las limitaciones y exclusiones de responsabilidad establecidas en esta
        Sección y en otras partes de este aviso legal:
      </h6>
      <ol>
        <li> Están sujetas al párrafo anterior </li>
        <li>
          Rigen todas las responsabilidades que surjan bajo la exención de
          responsabilidad o en relación con el objeto de esta exención de
          responsabilidad, incluidas las responsabilidades que surjan en contrato,
          agravio (incluyendo negligencia) y por incumplimiento del deber legal.
          En la medida en que el sitio web y la información y los servicios en el
          sitio web se proporcionen de forma gratuita, no seremos responsables de
          ninguna pérdida o daño de ningún tipo.
          {' '}
        </li>
      </ol>

    </div>
  );
}
export default TermsConditions;
