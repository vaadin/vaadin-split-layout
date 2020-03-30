import { css } from 'lit-element';

export const splitLayoutStyles = css`
  :host {
    display: flex;
    overflow: hidden !important;
    transform: translateZ(0);
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
  }

  :host ::slotted(*) {
    flex: 1 1 auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  [part='splitter'] {
    flex: none;
    position: relative;
    z-index: 1;
    overflow: visible;
    min-width: 8px;
    min-height: 8px;
  }

  :host(:not([orientation='vertical'])) > [part='splitter'] {
    cursor: ew-resize;
  }

  :host([orientation='vertical']) > [part='splitter'] {
    cursor: ns-resize;
  }

  [part='handle'] {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
`;
