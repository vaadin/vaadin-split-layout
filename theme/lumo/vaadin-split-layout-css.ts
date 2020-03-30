import { css } from 'lit-element';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';

export const splitLayoutStyles = css`
  [part='splitter'] {
    min-width: var(--lumo-space-s);
    min-height: var(--lumo-space-s);
    background-color: var(--lumo-contrast-5pct);
    transition: 0.1s background-color;
  }

  [part='handle'] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--lumo-size-m);
    height: var(--lumo-size-m);
  }

  [part='handle']::after {
    content: '';
    display: block;
    width: 4px;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: var(--lumo-border-radius);
    background-color: var(--lumo-contrast-30pct);
    transition: 0.1s opacity, 0.1s background-color;
  }

  :host([orientation='vertical']) [part='handle']::after {
    width: 100%;
    height: 4px;
  }

  [part='splitter']:hover [part='handle']::after {
    background-color: var(--lumo-contrast-40pct);
  }

  [part='splitter']:active [part='handle']::after {
    background-color: var(--lumo-contrast-50pct);
  }

  :host([theme~='small']) > [part='splitter'] {
    border-left: 1px solid var(--lumo-contrast-10pct);
    border-top: 1px solid var(--lumo-contrast-10pct);
  }

  :host([theme~='small']) > [part='splitter'],
  :host([theme~='minimal']) > [part='splitter'] {
    min-width: 0;
    min-height: 0;
    background-color: transparent;
  }

  :host([theme~='small']) > [part='splitter']::after,
  :host([theme~='minimal']) > [part='splitter']::after {
    content: '';
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
  }

  :host([theme~='small']) [part='handle']::after,
  :host([theme~='minimal']) [part='handle']::after {
    opacity: 0;
  }

  :host([theme~='small']) > [part='splitter']:hover > [part='handle']::after,
  :host([theme~='small']) > [part='splitter']:active > [part='handle']::after,
  :host([theme~='minimal']) > [part='splitter']:hover > [part='handle']::after,
  :host([theme~='minimal']) > [part='splitter']:active > [part='handle']::after {
    opacity: 1;
  }

  /* RTL styles */
  :host([theme~='small'][dir='rtl']) > [part='splitter'] {
    border-left: auto;
    border-right: 1px solid var(--lumo-contrast-10pct);
  }

  /* Touch device adjustment */
  @media (pointer: coarse) {
    [part='splitter']:hover [part='handle']::after {
      background-color: var(--lumo-contrast-30pct);
    }
  }
`;
