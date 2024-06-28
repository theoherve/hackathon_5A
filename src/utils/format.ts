export function calculerStatsGlobales(data: any) {
  let totalPositif = 0;
  let totalNegatif = 0;
  let totalNone = 0;

  Object.values(data?.resultat).forEach((evaluations: any) => {
    if (
      typeof evaluations === "object" &&
      evaluations !== null &&
      evaluations !== "none"
    ) {
      totalPositif += evaluations.positive || 0;
      totalNegatif += evaluations.negative || 0;
    } else {
      totalNone += evaluations || 0;
    }
  });

  console.log(totalPositif, totalNegatif, totalNone);
  return { totalPositif, totalNegatif, totalNone };
}
