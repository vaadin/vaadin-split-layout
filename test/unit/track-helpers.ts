import { makeSoloTouchEvent, touchstart, touchend } from '@vaadin/vaadin-component-dev-dependencies/events.js';
import { isIOS } from '@vaadin/browser-utils';

type TestEventCoords = { x: number; y: number };

function middleOfNode(node: Element): TestEventCoords {
  const bcr = node.getBoundingClientRect();
  return { y: bcr.top + bcr.height / 2, x: bcr.left + bcr.width / 2 };
}

function makeMouseEvent(type: string, xy: TestEventCoords, node: Element) {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: xy.x,
    clientY: xy.y,
    composed: true,
    buttons: 1
  });
  node.dispatchEvent(event);
}

export function move(node: Element, fromXY: TestEventCoords, toXY: TestEventCoords, steps = 5) {
  const dx = Math.round((fromXY.x - toXY.x) / steps);
  const dy = Math.round((fromXY.y - toXY.y) / steps);
  const xy = { x: fromXY.x, y: fromXY.y };
  for (let i = steps; i > 0; i -= 1) {
    makeMouseEvent('mousemove', xy, node);
    xy.x += dx;
    xy.y += dy;
  }
  makeMouseEvent('mousemove', { x: toXY.x, y: toXY.y }, node);
}

export function track(node: Element, dx: number, dy: number, steps = 5) {
  /* istanbul ignore if */
  const xy = middleOfNode(node);
  if (isIOS) {
    touchstart(node, xy);
    for (let i = 0; i <= steps; i += 1) {
      makeSoloTouchEvent(
        'touchmove',
        {
          x: xy.x + (dx * i) / steps,
          y: xy.y + (dy * i) / steps
        },
        node
      );
    }
    touchend(node, { x: xy.x + dx, y: xy.y + dy });
  } else {
    makeMouseEvent('mousedown', xy, node);
    const xy2 = { x: xy.x + dx, y: xy.y + dy };
    move(node, xy, xy2, steps);
    makeMouseEvent('mouseup', xy2, node);
  }
}
