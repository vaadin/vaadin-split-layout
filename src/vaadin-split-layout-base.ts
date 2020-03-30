import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';
import { splitLayoutStyles } from './vaadin-split-layout-css';

export class SplitLayoutBase extends VaadinElement {
  static get styles() {
    return splitLayoutStyles;
  }
}
