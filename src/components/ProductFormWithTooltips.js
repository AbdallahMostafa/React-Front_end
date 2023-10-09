import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ProductFormWithTooltips = ({ title, children }) => {
  return (
    <div className="input-group">
      {children}
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip id="button-tooltip">{title}</Tooltip>}
      >
        <span className="input-group-append">
          <FontAwesomeIcon icon="question-circle" />
        </span>
      </OverlayTrigger>
    </div>
  );
};

export default ProductFormWithTooltips;
