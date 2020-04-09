"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';

const HomeCard = (props) => {
    const {color, header, title, children} = props;
  return (
    <div>
      <Card outline color={color}>
        <CardHeader tag="h4">{header}</CardHeader>
        <CardBody outline color={color} className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardText>{children}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

HomeCard.propTypes = {
    color: PropTypes.string,
    header: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default HomeCard;