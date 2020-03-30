import { customElement } from 'lit-element';
import { SplitLayoutBase } from './vaadin-split-layout-base';
import { SplitLayoutMixin } from './vaadin-split-layout-mixin';

/**
 * `<vaadin-split-layout>` is a Web Component implementing a split layout for two
 * content elements with a draggable splitter between them. Content can be any HTML,
 * including nested `<vaadin-split-layout>`.
 *
 * #### Initial Splitter Position
 *
 * The initial splitter position is determined from the sizes of the content elements
 * inside the split layout. Changing `width` or `height` on them affects the initial splitter
 * position, depending on the `orientation`.
 *
 * When the total size of the content elements does not fit the layout, they are scaled
 * proportionally.
 *
 * When setting initial sizes with percentages, it is recommended to assign the size for both
 * elements.
 *
 * #### Size Limits
 *
 * The `min-width` / `min-height`, and `max-width` / `max-height` CSS size values
 * for the content elements are respected and used to limit the splitter position
 * when it is dragged. It is preferred to set the limits only for a single element.
 *
 * @slot primary - Slot where the first content element will be rendered into.
 * @slot secondary - Slot where the second content element will be rendered into.
 * @slot - Hidden slot where all the nodes except first and second one will go.
 *
 * @csspart splitter - The splitter element.
 * @csspart handle - The handle of the splitter.
 *
 * @event splitter-dragend - Fired after dragging the splitter has ended.
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
