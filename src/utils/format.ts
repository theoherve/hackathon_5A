export function calculerStatsGlobales(data: any) {
  let totalPositif = 0;
  let totalNegatif = 0;
  let totalNone = 0;

  data?.forEach((element: any) => {
    Object.values(element).forEach((evaluations: any) => {
      if (typeof evaluations === "object" && evaluations !== null) {
        totalPositif += evaluations.positive || 0;
        totalNegatif += evaluations.negative || 0;
      }
    });

    if (element.none) {
      totalNone += element.none;
    }
  });

  console.log(totalPositif, totalNegatif, totalNone);
  return { totalPositif, totalNegatif, totalNone };
}
