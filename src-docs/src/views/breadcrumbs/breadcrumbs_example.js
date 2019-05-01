import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiBreadcrumbs } from '../../../../src/components';

import Breadcrumbs from './breadcrumbs';
const breadcrumbsSource = require('!!raw-loader!./breadcrumbs');
const breadcrumbsHtml = renderToHtml(Breadcrumbs);

import Responsive from './responsive';
const responsiveSource = require('!!raw-loader!./responsive');
const responsiveHtml = renderToHtml(Responsive);

import Truncate from './truncate';
const truncateSource = require('!!raw-loader!./truncate');
const truncateHtml = renderToHtml(Truncate);

import Max from './max';
const maxSource = require('!!raw-loader!./max');
const maxHtml = renderToHtml(Max);

export const BreadcrumbsExample = {
  title: 'Breadcrumbs',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: breadcrumbsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: breadcrumbsHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>EuiBreadcrumbs</EuiCode> let the user track their progress within and back out of
          a UX flow. You can provide an <EuiCode>href</EuiCode> prop on any breadcrumb item that you
          wish to make clickable, including the last item, though we recommend the last item represent
          the current page and therefore the link is unnecessary. They work well within
          <EuiCode>EuiPageContentHeader</EuiCode> but be careful not to be use them within an app that
          also uses <EuiCode>EuiHeaderBreadcrumbs</EuiCode>.
        </p>
      ),
      props: { EuiBreadcrumbs },
      demo: <Breadcrumbs />,
    },
    {
      title: 'Responsive',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: responsiveSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: responsiveHtml,
        },
      ],
      text: (
        <p>
          The <EuiCode>responsive</EuiCode> prop will hide breadcrumbs on narrower screens.
        </p>
      ),
      props: { EuiBreadcrumbs },
      demo: <Responsive />,
    },
    {
      title: 'Truncate each breadcrumb',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: truncateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: truncateHtml,
        },
      ],
      text: (
        <div>
          <p>
            There are two ways to <EuiCode>truncate</EuiCode> breadrumbs,
          </p>
          <ol>
            <li>on the individual breadrcrumb item,</li>
            <li>
              on the full <EuiCode>EuiBreadcrumbs</EuiCode> set which will force the full set to a
              single line, while setting a max width on all items except for the last.
            </li>
          </ol>
        </div>
      ),
      props: { EuiBreadcrumbs },
      demo: <Truncate />,
    },
    {
      title: 'Limit the number of breadcrumbs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: maxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: maxHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>max</EuiCode> prop to cull breadcrumbs beyond a certain number. By
          default, this number is 5.
        </p>
      ),
      props: { EuiBreadcrumbs },
      demo: <Max />,
    },
  ],
};
