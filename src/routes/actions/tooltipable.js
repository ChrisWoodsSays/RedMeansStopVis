import Tooltip from '../Components/Tooltip.svelte';

/**
 * @param {{ removeEventListener: (arg0: string, arg1: { (e: any): void; (e: any): void; }) => void; addEventListener: (arg0: string, arg1: { (e: any): void; (e: any): void; }) => void; }} node
 */
export function tooltipable(node, { data, target = document.body, foregroundColor, backgroundColor }) {
  let component;
  // let node = e.originalEvent.fromElement
  // console.log(e, node)

  function handleMouseleave(e) {
    // console.log("handleMouseleave")
    component.$destroy();
    node.removeEventListener('mouseleave', handleMouseleave)
  }

  function handleMouseenter(e) {
    // console.log("handleMouseEnter")
    const { pageX: x, pageY: y } = e;
    const { clientWidth: targetWidth, clientHeight: targetHeight } = target;
    console.log("mouse ovet viz")
    component = new Tooltip({
      target,
      props: {
        id: data.id,
        shortName: data.shortName, 
        surveyDate: data.surveyDate, 
        minutesSurveyed: data.minutesSurveyed, 
        noOfPhases: data.noOfPhases, 
        redLightsPerJump: data.redLightsPerJump, 
        minutesPerJump: data.minutesPerJump,
        meaning: data.meaning, 
        colourcode: data.colourCode,
        x: x, 
        y: y,
        foregroundColor,
        backgroundColor,
        targetWidth,
        targetHeight
      },
      intro: true
    });

    node.addEventListener('mouseleave', handleMouseleave)
  }

  node.addEventListener('mouseenter', handleMouseenter);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseenter);
    },
    update(data) {
      target = data.target;
    },
  };
};
