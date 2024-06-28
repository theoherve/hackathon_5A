export function computeGlobalStats(data: any) {
  let positiveTotal = 0;
  let negativeTotal = 0;
  let neutralTotal = 0;

  Object.values(data?.resultat).forEach((evaluations: any) => {
    if (
      typeof evaluations === "object" &&
      evaluations !== null &&
      evaluations !== "none"
    ) {
      positiveTotal += evaluations.positive || 0;
      negativeTotal += evaluations.negative || 0;
    } else {
      neutralTotal += evaluations || 0;
    }
  });

  return { positiveTotal, negativeTotal, neutralTotal, globalReview: data?.avis.global};
}

/**
 * Compute the stats for a specific service
 * @param data
 * @param serviceName
 */
export function computeServiceStats(data: any, serviceName: string) {
  let serviceData = Object.entries(data?.resultat).find(
    ([key, value]: any) => (key === serviceName)
  );

  if (!serviceData) {
    return {positiveTotal: 0, negativeTotal: 0};
  }

  let positiveTotal = 0;
  let negativeTotal = 0;

  Object.values(serviceData).forEach((evaluations: any)=> {
    if (
      typeof evaluations === "object" &&
      evaluations !== null &&
      evaluations !== "none"
    ) {
      positiveTotal += evaluations.positive || 0;
      negativeTotal += evaluations.negative || 0;
    }
  });

  return { positiveTotal, negativeTotal };
}

/**
 * get the review for a specific service
 * @param data
 * @param serviceName
 */
export function getServiceReview(
  data: any,
  serviceName: string
): string {
  let serviceData = Object.entries(data?.avis).find(
    ([key, value]: any) => (key === serviceName)
  );

  if (!serviceData) {
    return [];
  }

  return Object.values(serviceData)[1];
}