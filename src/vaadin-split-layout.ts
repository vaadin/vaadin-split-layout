import { customElement } from 'lit-element';
import { SplitLayoutBase } from './vaadin-split-layout-base';
import { SplitLayoutMixin } from './vaadin-split-layout-mixin';

/**
 * `<vaadin-split-layout>` is a Web Component implementing a split layout for two
 * content elements with a draggable splitter between them.
 */
@customElement('vaadin-split-layout')
export class VaadinSplitLayout extends SplitLayoutMixin(SplitLayoutBase) {
  static is = 'vaadin-split-layout';

  static get version() {
    return '4.2.0-alpha1';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-split-layout': VaadinSplitLayout;
  }
}
