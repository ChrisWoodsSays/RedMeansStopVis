import TooltipPeriod from '../components/TooltipPeriod.svelte';
import TooltipActivity from '../components/TooltipActivity.svelte';

export function tooltipableGeneral(node, { type, data, chartWidth, target = document.body }) {
  let component;

  function handleMouseleave(e) {
    component.$destroy();
    node.removeEventListener('mouseleave', handleMouseleave)
  }

  function handleMouseenter(e) {
    const { pageX: x, pageY: y } = e;
    const { clientWidth: targetWidth, clientHeight: targetHeight } = target;

    let props
    switch(type) {
      case "period":
        let year = data.year;
        let period = data.period;
        props = {
          id: +year.year + period.period,
          year: year.year,
          period: period.period,
          activityCount: period.activityCount,
          periodName: period.periodName,
          totalDistance: period.totalDistance,
          maxDistance: period.maxDistance,
          maxAvgSpeed: period.maxAvgSpeed,
          x, 
          y: y + 15,
          chartWidth,
          targetWidth,  // from bound tooltipTarget, i.e. "scrollama-container" Div
          targetHeight
        }
        component = new TooltipPeriod({
          target,
          props: props,
          intro: true
        });
        break;
      case "activity":
        props = {
          id: data.id,
          actvityDateString: data.actvityDateString,
          name: data.name,
          movingTimeHours: data.movingTimeHours,
          distance: data.distance,
          elevationGain: data.elevationGain,
          average_speed: data.average_speed,
          cluster: data.cluster,
          //destinationId: data.destinationId,
          destination: data.destination,
          x, 
          y: y + 15,
          chartWidth,
          targetWidth,
          targetHeight
        }
        component = new TooltipActivity({
          target,
          props: props,
          intro: true
        });
        break;
      default:
        // code block
    }

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
