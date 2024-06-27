export function calculerStatsGlobales(data: any) {
  let totalPositif = 0;
  let totalNegatif = 0;
  let totalNone = 0;

  data?.forEach((element: { value: [value1: number, value2: number] }) => {
    Object.values(element).forEach((evaluations) => {
      totalPositif += evaluations[0];
      totalNegatif += evaluations[1];
    });
  });

  return { totalPositif, totalNegatif, totalNone };
}
