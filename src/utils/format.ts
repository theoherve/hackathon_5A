export function computeGlobalStats(data: any) {
  let positiveTotal = 0;
  let negativeTotal = 0;
  let neutralTotal = 0;

  if (!data) {
    return {
      positiveTotal,
      negativeTotal,
      neutralTotal,
      globalReview: "",
    };
  }

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

  return {
    positiveTotal,
    negativeTotal,
    neutralTotal,
    globalReview: data?.avis.global,
  };
}

/**
 * Compute the stats for a specific service
 * @param data
 * @param serviceName
 */
export function computeServiceStats(data: any, serviceName: string) {
  let serviceData = Object.entries(data?.resultat).find(
    ([key, value]: any) => key === serviceName
  );

  if (!serviceData) {
    return { positiveTotal: 0, negativeTotal: 0 };
  }

  let positiveTotal = 0;
  let negativeTotal = 0;

  Object.values(serviceData).forEach((evaluations: any) => {
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
export function getServiceReview(data: Stats, serviceName: string) {
  let serviceData = Object.entries(data?.avis).find(
    ([key, value]: any) => key === serviceName
  );

  if (!serviceData) {
    return [];
  }

  return Object.values(serviceData)[1];
}

function calculateSatisfaction(obj: any): {
  details: { [key: string]: number };
  overall: number;
} {
  const details: { [key: string]: number } = {};
  let totalPositive = 0;
  let totalNegative = 0;

  for (const key in obj.resultat) {
    const res = obj.resultat[key];
    const total = res.positive + res.negative;
    const satisfaction = total !== 0 ? (res.positive / total) * 100 : 0;

    details[key] = satisfaction;
    totalPositive += res.positive;
    totalNegative += res.negative;
  }

  const overallTotal = totalPositive + totalNegative;
  const overallSatisfaction =
    overallTotal !== 0 ? (totalPositive / overallTotal) * 100 : 0;

  return {
    details,
    overall: overallSatisfaction,
  };
}

export function compareSatisfaction(
  obj1: any,
  obj2: any
): {
  details: { [key: string]: number };
  overall: number;
} {
  const satisfaction1 = calculateSatisfaction(obj1);
  const satisfaction2 = calculateSatisfaction(obj2);

  const allKeys = new Set([
    ...Object.keys(satisfaction1.details),
    ...Object.keys(satisfaction2.details),
  ]);

  const details: { [key: string]: number } = {};

  allKeys.forEach((key) => {
    const satisfaction1Value = satisfaction1.details[key] || 0;
    const satisfaction2Value = satisfaction2.details[key] || 0;
    const difference = satisfaction2Value - satisfaction1Value;

    details[key] = difference;
  });

  const overallDifference = satisfaction2.overall - satisfaction1.overall;

  return {
    details,
    overall: overallDifference,
  };
}
