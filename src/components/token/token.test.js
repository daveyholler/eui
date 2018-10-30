import React from 'react';
import { render } from 'enzyme';

import { EuiToken } from './token';

describe('EuiToken', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToken iconType="tokenClass" size="s" color="tokenColor01" shape="square" />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
