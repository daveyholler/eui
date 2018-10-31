import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ICON_TYPES, EuiIcon } from '../icon';
import { TOKEN_MAP } from './token_map';

const sizeToClassMap = {
  s: 'euiToken--small',
  m: 'euiToken--medium',
  l: 'euiToken--large',
};

export const SIZES = Object.keys(sizeToClassMap);

const shapeToClassMap = {
  circle: 'euiToken--circle',
  square: 'euiToken--square',
  rectangle: 'euiToken--rectangle',
};

export const SHAPES = Object.keys(shapeToClassMap);

export const EuiToken = ({
  iconType,
  displayOptions,
  size,
  className,
  ...rest,
}) => {

  // Check if display options is empty
  const displayOptionsIsEmpty = Object.keys(displayOptions).length === 0 && displayOptions.constructor === Object;

  // Set some defaults for our displayOptions in case they only use some of them
  let tokenShape = 'square';
  let tokenColor = 'tokenTint01';
  let tokenIsOpaque = false;

  // Check if this has a mapping, and doesn't have custom displayOptions
  if ((iconType in TOKEN_MAP) && (displayOptionsIsEmpty)) {
    tokenShape = TOKEN_MAP[iconType].shape;
    tokenColor = TOKEN_MAP[iconType].color;
    tokenIsOpaque = (TOKEN_MAP[iconType].isOpaque ? true : false);
  } else {
    tokenShape = displayOptions.shape;
    tokenColor = displayOptions.color;
    tokenIsOpaque = displayOptions.isOpaque ? true : false;
  }

  const classes = classNames(
    'euiToken',
    `euiToken--${tokenShape}`,
    `euiToken--${tokenColor}`,
    sizeToClassMap[size],
    {
      'euiToken--opaque': tokenIsOpaque
    },
    className
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiIcon type={iconType} />
    </div>
  );
};

EuiToken.propTypes = {
  /**
   * An EUI icon type
   */
  iconType: PropTypes.oneOf(ICON_TYPES).isRequired,
  /**
   * Size of the token
   */
  size: PropTypes.oneOf(SIZES).isRequired,
  /**
   * By default EUI will auto color tokens. You can can however control it
   * `color`: can be `tokenTint01` thru `tokenTint10`
   * - `shape`: square, circle, rectangle as options
   * - `isOpaque`: makes it a solid color
   */
  displayOptions: PropTypes.shape({
    color: PropTypes.string,
    shape: PropTypes.string,
    isOpaque: PropTypes.boolean,
  }),
};

EuiToken.defaultProps = {
  size: 's',
  displayOptions: {},
};