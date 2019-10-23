import React, { Component, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps, PropsOf, ExclusiveUnion } from '../common';
// @ts-ignore-next-line
import { EuiBreadcrumbs } from '../breadcrumbs';
// @ts-ignore-next-line
import { EuiButton, EuiButtonIcon } from '../button';
import { EuiPortal } from '../portal';
import { EuiText } from '../text';

type ButtonControl = ButtonHTMLAttributes<HTMLButtonElement> & {
  controlType: 'button';
  id: string;
  color?: PropsOf<typeof EuiButton>['color'];
  label: string;
  classNames?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

type TabControl = ButtonHTMLAttributes<HTMLButtonElement> & {
  controlType: 'tab';
  id: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

interface Breadcrumb {
  text: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  truncate?: boolean;
}

type BreadcrumbControl = HTMLAttributes<HTMLDivElement> & {
  controlType: 'breadcrumbs';
  id: string;
  responsive?: boolean;
  truncate?: boolean;
  max?: number;
  breadcrumbs: Breadcrumb[];
};

interface TextControl extends CommonProps, HTMLAttributes<HTMLDivElement> {
  controlType: 'text';
  id: string;
  label: React.ReactNode;
}

interface SpacerControl {
  controlType: 'spacer';
}

interface DivideControl {
  controlType: 'divider';
}

type IconControl = ButtonHTMLAttributes<HTMLButtonElement> & {
  controlType: 'icon';
  id: string;
  iconType: string;
  label: string;
  classNames?: string;
  color?: PropsOf<typeof EuiButtonIcon>['color'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type Control = ExclusiveUnion<
  ExclusiveUnion<
    ExclusiveUnion<
      ExclusiveUnion<
        ExclusiveUnion<
          ButtonControl,
          ExclusiveUnion<BreadcrumbControl, TabControl>
        >,
        TextControl
      >,
      IconControl
    >,
    DivideControl
  >,
  SpacerControl
>;

export type EuiControlBarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Show or hide the content area containing the `children`
     */
    showContent?: boolean;

    /**
     * An array of controls, actions, and layout spacers to display.
     * Accepts `'button' | 'tab' | 'breadcrumbs' | 'text' | 'icon' | 'spacer' | 'divider'`
     */
    controls: Control[];
    /**
     * The maximum height of the overlay. Default is 100% of the window height - 10rem, Medium is 50% of the window height, Small is 25% of the window height;
     */
    size?: 's' | 'm' | 'l';
    /**
     * Set the offset from the left side of the screen to account for EuiNavDrawer.
     */
    navDrawerOffset?: 'collapsed' | 'expanded' | undefined;
    /**
     * The control bar is hidden on mobile by default. Use the `showOnMobile` prop to force it's display on mobile screens.
     * You'll need to ensure that the content you place into the bar renders as expected on mobile.
     */
    showOnMobile?: boolean;
  };

interface EuiControlBarState {
  selectedTab: string;
}

export class EuiControlBar extends Component<
  EuiControlBarProps,
  EuiControlBarState
> {
  state = {
    selectedTab: '',
  };

  render() {
    const {
      children,
      className,
      showContent,
      controls,
      size,
      navDrawerOffset,
      showOnMobile,
      ...rest
    } = this.props;

    const classes = classnames('euiControlBar', className, {
      'euiControlBar--open': showContent,
      'euiControlBar--large': size === 'l' || !size,
      'euiControlBar--medium': size === 'm',
      'euiControlBar--small': size === 's',
      'euiControlBar--navExpanded': navDrawerOffset === 'expanded',
      'euiControlBar--navCollapsed': navDrawerOffset === 'collapsed',
      'euiControlBar--showOnMobile': showOnMobile,
    });

    const tabClasses = classnames('euiControlBar__tab', {
      'euiControlBar__tab--active': showContent,
    });

    const handleTabClick = (
      control: TabControl,
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      this.setState(
        {
          selectedTab: control.id,
        },
        () => {
          control.onClick(e);
        }
      );
    };

    const controlItem = (control: Control, index: number) => {
      switch (control.controlType) {
        case 'button': {
          const {
            controlType,
            id,
            color,
            label,
            classNames,
            onClick,
            ...rest
          } = control;
          return (
            <EuiButton
              key={id + index}
              onClick={onClick}
              className={classnames('euiControlBar__button', classNames)}
              color={color ? color : 'ghost'}
              size="s"
              {...rest}>
              {label}
            </EuiButton>
          );
        }
        case 'icon': {
          const {
            controlType,
            id,
            iconType,
            label,
            classNames,
            color,
            onClick,
            ...rest
          } = control;
          return (
            <EuiButtonIcon
              key={id + index}
              iconType={iconType}
              data-test-subj={label}
              aria-label={label}
              onClick={onClick}
              className={classnames('euiControlBar__buttonIcon', classNames)}
              color={color ? color : 'ghost'}
              size="s"
              {...rest}
            />
          );
        }
        case 'divider':
          return (
            <div
              key={control.controlType + index}
              className="euiControlBar__divider"
            />
          );
        case 'spacer':
          return (
            <div
              key={control.controlType + index}
              className="euiControlBar__spacer"
            />
          );
        case 'text': {
          const { controlType, id, label, className, ...rest } = control;
          return (
            <div
              key={id}
              className={classNames('euiControlBar__euiText', className)}
              {...rest}>
              {label}
            </div>
          );
        }
        case 'tab': {
          const { controlType, id, label, onClick, ...rest } = control;
          return (
            <button
              key={id + index}
              className={`euiControlBar__tab ${
                id === this.state.selectedTab ? tabClasses : ''
              }`}
              data-test-subj={label}
              aria-label={`Control Bar - ${label}`}
              onClick={event => handleTabClick(control, event)}
              {...rest}>
              <EuiText size="s" className="eui-textTruncate">
                {label}
              </EuiText>
            </button>
          );
        }
        case 'breadcrumbs': {
          const {
            controlType,
            id,
            responsive,
            truncate,
            max,
            breadcrumbs,
            ...rest
          } = control;
          return (
            <EuiBreadcrumbs
              key={control.id}
              breadcrumbs={control.breadcrumbs}
              responsive={control.responsive}
              truncate={control.truncate}
              max={control.max}
              {...rest}
            />
          );
        }
      }
    };

    return (
      <EuiPortal>
        <div className={classes} {...rest}>
          <div className="euiControlBar__controls">
            {controls.map((control, index) => {
              return controlItem(control, index);
            })}
          </div>
          {this.props.showContent ? (
            <div className="euiControlBar__content">{children}</div>
          ) : null}
        </div>
      </EuiPortal>
    );
  }
}
