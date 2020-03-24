import { expect, fixture, html, nextFrame } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { mousedown, mouseup, touchstart, touchend } from '@vaadin/vaadin-component-dev-dependencies/events.js';
import { VaadinSplitLayout } from '../../src/vaadin-split-layout';
import { track } from './track-helpers';

const { sinon } = window;

describe('split-layout', () => {
  let layout: VaadinSplitLayout;
  let splitter: HTMLElement;

  describe('custom element definition', () => {
    let tagName: string;

    beforeEach(async () => {
      layout = await fixture(
        html`
          <vaadin-split-layout></vaadin-split-layout>
        `
      );
      tagName = layout.tagName.toLowerCase();
    });

    it('should be defined in custom element registry', () => {
      expect(customElements.get(tagName)).to.be.ok;
      expect(layout instanceof VaadinSplitLayout).to.be.ok;
    });

    it('should have a valid static "is" getter', () => {
      expect(customElements.get(tagName).is).to.equal(tagName);
    });

    it('should have a valid version number', () => {
      expect(customElements.get(tagName).version).to.match(/^(\d+\.)?(\d+\.)?(\d+)(-(alpha|beta)\d+)?$/);
    });
  });

  describe('styles', () => {
    let first: HTMLElement;
    let second: HTMLElement;

    beforeEach(async () => {
      layout = await fixture(html`
        <vaadin-split-layout>
          <div id="first">some content</div>
          <div id="second">some content</div>
        </vaadin-split-layout>
      `);
      splitter = layout.renderRoot.querySelector('#splitter') as HTMLElement;
      await nextFrame();
      first = layout.querySelector('#first') as HTMLElement;
      second = layout.querySelector('#second') as HTMLElement;
    });

    it('should make split-layout a flex container', () => {
      expect(getComputedStyle(layout).display).to.equal('flex');
    });

    it('should set flex: auto on the content elements', () => {
      const getComputedFlexStyle = (el: HTMLElement) => {
        const style = getComputedStyle(el);
        return style.flex || [style.flexGrow, style.flexShrink, style.flexBasis].join(' ');
      };

      expect(getComputedFlexStyle(first)).to.equal('1 1 auto');
      expect(getComputedFlexStyle(second)).to.equal('1 1 auto');
    });

    it('should set overflow: visible on the splitter', () => {
      expect(getComputedStyle(splitter).overflow).to.equal('visible');
    });
  });

  describe('content elements', () => {
    let first: HTMLElement;
    let second: HTMLElement;

    beforeEach(async () => {
      layout = await fixture(html`
        <vaadin-split-layout>
          <div id="first">some content</div>
          <div id="second">some content</div>
        </vaadin-split-layout>
      `);
      splitter = layout.renderRoot.querySelector('#splitter') as HTMLElement;
      await nextFrame();
      first = layout.querySelector('#first') as HTMLElement;
      second = layout.querySelector('#second') as HTMLElement;
    });

    it('should be distributed to slots', () => {
      expect(first.assignedSlot!.getAttribute('name')).to.equal('primary');
      expect(second.assignedSlot!.getAttribute('name')).to.equal('secondary');
    });

    it('should have a splitter between slots', () => {
      const prev = splitter.previousElementSibling as HTMLSlotElement;
      const next = splitter.nextElementSibling as HTMLSlotElement;
      expect(prev.assignedNodes({ flatten: true })[0]).to.equal(first);
      expect(next.assignedNodes({ flatten: true })[0] || next).to.equal(second);
    });

    it('should set pointer-events: none to panels on mousedown event', () => {
      first.style.pointerEvents = 'visible';
      second.style.pointerEvents = 'visible';

      mousedown(splitter);
      expect(getComputedStyle(first).pointerEvents).to.equal('none');
      expect(getComputedStyle(second).pointerEvents).to.equal('none');
    });

    it('should restore pointer-events on panels on mouseup event', () => {
      first.style.pointerEvents = 'visible';
      second.style.pointerEvents = 'visible';

      mousedown(splitter);
      mouseup(splitter);
      expect(getComputedStyle(first).pointerEvents).to.equal('visible');
      expect(getComputedStyle(second).pointerEvents).to.equal('visible');
    });

    it('should set pointer-events: none to panels on touchstart event', () => {
      first.style.pointerEvents = 'visible';
      second.style.pointerEvents = 'visible';

      touchstart(splitter);
      expect(getComputedStyle(first).pointerEvents).to.equal('none');
      expect(getComputedStyle(second).pointerEvents).to.equal('none');
    });

    it('should restore pointer-events on panels on touchend event', () => {
      first.style.pointerEvents = 'visible';
      second.style.pointerEvents = 'visible';

      touchstart(splitter);
      touchend(splitter);
      expect(getComputedStyle(first).pointerEvents).to.equal('visible');
      expect(getComputedStyle(second).pointerEvents).to.equal('visible');
    });
  });

  describe('dimensions', () => {
    const initialSizes = { width: 128, height: 128 };
    let first: HTMLElement;
    let second: HTMLElement;

    beforeEach(async () => {
      layout = await fixture(html`
        <vaadin-split-layout>
          <div id="first">some content</div>
          <div id="second">some content</div>
        </vaadin-split-layout>
      `);
      splitter = layout.renderRoot.querySelector('#splitter') as HTMLElement;
      layout.style.width = `${initialSizes.width}px`;
      layout.style.height = `${initialSizes.height}px`;
      await nextFrame();
      first = layout.querySelector('#first') as HTMLElement;
      second = layout.querySelector('#second') as HTMLElement;
    });

    function testDimensions(isVertical: boolean) {
      const size = isVertical ? 'height' : 'width';
      const crossSize = isVertical ? 'width' : 'height';
      let layoutRect: DOMRect;

      beforeEach(() => {
        layoutRect = layout.getBoundingClientRect();
      });

      describe('content elements', () => {
        let firstRect: DOMRect;
        let secondRect: DOMRect;

        beforeEach(() => {
          firstRect = first.getBoundingClientRect();
          secondRect = second.getBoundingClientRect();
        });

        it('should have equal initial size', () => {
          expect(Math.abs(firstRect[size] - secondRect[size])).to.be.at.most(1);
        });

        it('should have crossSize of container', () => {
          expect(firstRect[crossSize]).to.equal(layoutRect[crossSize]);
        });

        it('should respect initial css size', () => {
          const totalSize = initialSizes[size] - 8;
          const cssPrimarySize = 0.25;
          const cssSecondarySize = 1 - cssPrimarySize;
          first.style[size] = `${cssPrimarySize * 100}%`;
          second.style[size] = `${cssSecondarySize * 100}%`;
          expect(Math.abs(first.getBoundingClientRect()[size] / totalSize - cssPrimarySize)).to.be.at.most(0.01);
          expect(Math.abs(second.getBoundingClientRect()[size] / totalSize - cssSecondarySize)).to.be.at.most(0.01);
        });
      });

      describe('splitter', () => {
        let splitterRect: DOMRect;

        beforeEach(() => {
          splitterRect = splitter.getBoundingClientRect();
        });

        it('should have size of 8 pixels', () => {
          expect(splitterRect[size]).to.be.within(7.5, 8.5);
        });

        it('should have crossSize of container', () => {
          expect(splitterRect[crossSize]).to.equal(layoutRect[crossSize]);
        });
      });

      describe('drag handle', () => {
        const distance = 30;
        const initialSize = (initialSizes[size] - 8) / 2;
        const dragHandle = (d: number) => {
          track(splitter, isVertical ? 0 : d, isVertical ? d : 0);
        };

        it('should resize forwards', () => {
          dragHandle(distance);
          expect(Math.abs(first.getBoundingClientRect()[size] - (initialSize + distance))).to.be.at.most(1);
          expect(Math.abs(second.getBoundingClientRect()[size] - (initialSize - distance))).to.be.at.most(1);
        });

        it('should resize backwards', () => {
          dragHandle(distance);
          dragHandle(-distance);
          expect(Math.abs(first.getBoundingClientRect()[size] - initialSize)).to.be.at.most(1);
          expect(Math.abs(second.getBoundingClientRect()[size] - initialSize)).to.be.at.most(1);
        });

        it('should collapse primary', () => {
          dragHandle(-initialSize);
          expect(first.getBoundingClientRect()[size]).to.equal(0);
        });

        it('should reveal primary', () => {
          dragHandle(-initialSize);
          dragHandle(initialSize);
          expect(Math.abs(first.getBoundingClientRect()[size] - initialSize)).to.be.at.most(1);
        });

        it('should collapse secondary', () => {
          dragHandle(initialSize);
          expect(second.getBoundingClientRect()[size]).to.equal(0);
        });

        it('should reveal secondary', () => {
          dragHandle(initialSize);
          dragHandle(-initialSize);
          expect(Math.abs(second.getBoundingClientRect()[size] - initialSize)).to.be.at.most(1);
        });

        it('should respect the container boundaries', () => {
          dragHandle(-initialSize * 2);
          expect(first.getBoundingClientRect()[size]).to.equal(0);
          expect(Math.abs(second.getBoundingClientRect()[size] - initialSize * 2)).to.be.at.most(0.1);

          dragHandle(initialSize * 2);
          expect(Math.abs(first.getBoundingClientRect()[size] - initialSize * 2)).to.be.at.most(0.1);
          expect(second.getBoundingClientRect()[size]).to.equal(0);
        });

        it('should dispatch `splitter-dragend` event', () => {
          const spy = sinon.spy();
          layout.addEventListener('splitter-dragend', spy);
          dragHandle(distance);
          expect(spy).to.be.calledOnce;
        });

        (isVertical ? describe.skip : describe)('RTL mode', () => {
          beforeEach(() => {
            layout.setAttribute('dir', 'rtl');
          });

          it('should resize forwards', () => {
            dragHandle(distance);
            expect(Math.abs(second.getBoundingClientRect()[size] - (initialSize + distance))).to.be.at.most(1);
            expect(Math.abs(first.getBoundingClientRect()[size] - (initialSize - distance))).to.be.at.most(1);
          });

          it('should resize backwards', () => {
            dragHandle(distance);
            dragHandle(-distance);

            expect(Math.abs(second.getBoundingClientRect()[size] - initialSize)).to.be.at.most(1);
            expect(Math.abs(first.getBoundingClientRect()[size] - initialSize)).to.be.at.most(1);
          });
        });
      });
    }

    describe('horizontal', () => {
      testDimensions(false);
    });

    describe('vertical', () => {
      beforeEach(async () => {
        layout.orientation = 'vertical';
        await layout.updateComplete;
      });

      testDimensions(true);
    });
  });

  describe('with one child', () => {
    beforeEach(async () => {
      layout = await fixture(
        html`
          <vaadin-split-layout>
            <div id="first">some content</div>
          </vaadin-split-layout>
        `
      );
      splitter = layout.renderRoot.querySelector('#splitter') as HTMLElement;
    });

    it('should not throw on mousedown and mouseup', () => {
      const downAndUp = () => {
        mousedown(splitter);
        mouseup(splitter);
      };
      expect(downAndUp).to.not.throw(Error);
    });

    it('should not throw on touchstart and touchend', () => {
      const makeTouch = () => {
        touchstart(splitter);
        touchend(splitter);
      };
      expect(makeTouch).to.not.throw(Error);
    });

    it('should not throw on splitter track event', () => {
      const dragSplitter = () => {
        track(splitter, 10, 0);
      };
      expect(dragSplitter).to.not.throw(Error);
    });
  });

  describe('with extra child', () => {
    let first: HTMLElement;
    let second: HTMLElement;
    let third: HTMLElement;

    beforeEach(async () => {
      layout = await fixture(html`
        <vaadin-split-layout>
          <div id="first">some content</div>
          <div id="second">some content</div>
          <div id="third">some content</div>
        </vaadin-split-layout>
      `);
      splitter = layout.renderRoot.querySelector('#splitter') as HTMLElement;
      await nextFrame();
      first = layout.querySelector('#first') as HTMLElement;
      second = layout.querySelector('#second') as HTMLElement;
      third = layout.querySelector('#third') as HTMLElement;
    });

    it('should distribute elements other than first and second to hidden slot', () => {
      expect(first.assignedSlot!.getAttribute('name')).to.equal('primary');
      expect(second.assignedSlot!.getAttribute('name')).to.equal('secondary');
      expect(third.assignedSlot!.hasAttribute('name')).to.be.false;
      expect(third.assignedSlot!.parentElement!.hasAttribute('hidden')).to.be.true;
    });

    it('should re-distribute elements when changing using insertBefore', async () => {
      layout.removeChild(third);
      await nextFrame();
      await nextFrame();
      layout.insertBefore(third, second);
      await nextFrame();
      await nextFrame();
      expect(first.assignedSlot!.getAttribute('name')).to.equal('primary');
      expect(second.assignedSlot!.hasAttribute('name')).to.be.false;
      expect(second.assignedSlot!.parentElement!.hasAttribute('hidden')).to.be.true;
      expect(third.assignedSlot!.getAttribute('name')).to.equal('secondary');
    });

    it('should re-distribute elements when removing using removeChild', async () => {
      layout.removeChild(second);
      await nextFrame();
      await nextFrame();
      expect(first.assignedSlot!.getAttribute('name')).to.equal('primary');
      expect(second.assignedSlot).to.not.be.ok;
      expect(third.assignedSlot!.getAttribute('name')).to.equal('secondary');
    });
  });

  describe('a11y', () => {
    beforeEach(async () => {
      layout = await fixture(
        html`
          <vaadin-split-layout></vaadin-split-layout>
        `
      );
    });

    it('should pass accessibility test', async () => {
      await expect(layout).to.be.accessible();
    });
  });
});
