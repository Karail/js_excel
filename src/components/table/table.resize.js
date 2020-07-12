import { $ } from '@core/dom';

export function resizeHandler($root, e) {
  return new Promise((resolve) => {
    const $resizer = $(e.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';

    let value;
    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    });

    document.onmousemove = (event) => {
      if (type === 'col') {
        const delta = Math.floor(event.pageX - coords.right);
        value = Math.floor(coords.width + delta);
        $resizer.css({
          right: `${-delta}px`
        });
      } else {
        const delta = Math.floor(event.pageY - coords.bottom);
        value = Math.floor(coords.height + delta);
        $resizer.css({
          bottom: `${-delta}px`
        });
      }
    }
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => el.style.width = `${value}px`);
        $parent.css({
          width: `${value}px`
        });
      } else {
        $parent.css({
          height: `${value}px`
        });
      }

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      });
      
      resolve({
        value,
        type,
        id: $parent.data[type]
      });

    }
  })
}