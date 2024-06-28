export function calculerStatsGlobales(data: any) {
  let totalPositive = 0;
  let totalNegative = 0;
  let totalNone = 0;

  console.log(data);
  
  Object.values(data?.resultat).forEach((evaluations: any) => {
    if (
      typeof evaluations === "object" &&
      evaluations !== null &&
      evaluations !== "none"
    ) {
      totalPositive += evaluations.positive || 0;
      totalNegative += evaluations.negative || 0;
    } else {
      totalNone += evaluations || 0;
    }
  });

  return { totalPositive, totalNegative, totalNone, globalReview: data?.avis.global};
}
