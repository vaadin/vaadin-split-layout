import { LitElement, html, property, PropertyValues } from 'lit-element';
import { Constructor } from '@vaadin/mixin-utils';
import { DownUpMixin } from '@vaadin/down-up-mixin/down-up-mixin.js';
import { TrackEventMixin } from '@vaadin/track-event-mixin/track-event-mixin.js';

export interface SplitLayoutInterface {
  orientation: string | null | undefined;
}

export const SplitLayoutMixin = <T extends Constructor<LitElement>>(base: T): T & Constructor<SplitLayoutInterface> => {
  class SplitLayout extends TrackEventMixin(DownUpMixin(base)) {
    /**
     * Split layout is aligned horizontally by default. Set to "vertical" to change this.
     */
    @property({ type: String, reflect: true })
    orientation: string | null | undefined;

    private _primaryChild?: HTMLElement;

    private _secondaryChild?: HTMLElement;

    private _splitter?: HTMLElement;

    private _processing = false;

    private _startSize = { container: 0, primary: 0, secondary: 0 };

    private _oldPointerEvents = ['', ''];

    protected render() {
      return html`
        <slot id="primary" name="primary" @slotchange="${this._processChildren}"></slot>
        <div part="splitter" id="splitter" @track="${this._onHandleTrack}">
          <div part="handle"></div>
        </div>
        <slot id="secondary" name="secondary" @slotchange="${this._processChildren}"></slot>
        <div hidden>
          <slot @slotchange="${this._processChildren}"></slot>
        </div>
      `;
    }

    protected firstUpdated(props: PropertyValues) {
      // store reference before adding listeners
      this._splitter = this.renderRoot.querySelector('#splitter') as HTMLElement;
      super.firstUpdated(props);
      this._processChildren();
    }

    protected get _downUpTarget() {
      return this._splitter as HTMLElement;
    }

    protected get _trackTargets() {
      return [this._splitter as HTMLElement];
    }

    private _onHandleTrack(event: CustomEvent) {
      if (!this._primaryChild || !this._secondaryChild) {
        return;
      }

      const { state, dy, dx } = event.detail;

      const size = this.orientation === 'vertical' ? 'height' : 'width';
      if (state === 'start') {
        this._startSize = {
          container: this.getBoundingClientRect()[size] - (this._splitter as HTMLElement).getBoundingClientRect()[size],
          primary: this._primaryChild.getBoundingClientRect()[size],
          secondary: this._secondaryChild.getBoundingClientRect()[size]
        };

        return;
      }

      const isVertical = this.orientation === 'vertical';
      const distance = isVertical ? dy : dx;
      const isRtl = !isVertical && this.getAttribute('dir') === 'rtl';
      const dirDistance = isRtl ? -distance : distance;

      const { primary, secondary, container } = this._startSize;

      this._setFlexBasis(this._primaryChild, primary + dirDistance, container);
      this._setFlexBasis(this._secondaryChild, secondary - dirDistance, container);

      if (state === 'end') {
        this.dispatchEvent(new CustomEvent('splitter-dragend'));
      }
    }

    protected _onDown() {
      const { _primaryChild: primary, _secondaryChild: secondary } = this;
      if (!primary || !secondary) {
        return;
      }

      this._oldPointerEvents = [primary.style.pointerEvents || '', secondary.style.pointerEvents || ''];

      primary.style.pointerEvents = 'none';
      secondary.style.pointerEvents = 'none';
    }

    protected _onUp() {
      const { _primaryChild: primary, _secondaryChild: secondary } = this;
      if (!primary || !secondary) {
        return;
      }
      const [oldPrimary, oldSecondary] = this._oldPointerEvents;
      primary.style.pointerEvents = oldPrimary;
      secondary.style.pointerEvents = oldSecondary;
    }

    private _processChildren() {
      // Avoid calling method multiple times
      // after setting attribute on children
      if (!this._processing) {
        [this._primaryChild, this._secondaryChild].forEach((child, i) => {
          if (child && child.parentElement !== this) {
            child.style.flex = '';
            child.removeAttribute('slot');
            this[i === 0 ? '_primaryChild' : '_secondaryChild'] = undefined;
          }
        });

        this._processing = true;
        Array.from(this.children).forEach((node, i) => {
          const child = node as HTMLElement;
          if (i === 0) {
            this._primaryChild = child;
            child.setAttribute('slot', 'primary');
          } else if (i === 1) {
            this._secondaryChild = child;
            child.setAttribute('slot', 'secondary');
          } else {
            child.removeAttribute('slot');
          }
        });

        window.requestAnimationFrame(() => {
          this._processing = false;
        });
      }
    }

    private _setFlexBasis(element: HTMLElement, flexBasis: number, containerSize: number) {
      let basis = Math.max(0, Math.min(flexBasis, containerSize));
      if (basis === 0) {
        // Pure zero does not play well in Safari
        basis = 0.000001;
      }
      element.style.flex = `1 1 ${basis}px`;
    }
  }

  return SplitLayout;
};
