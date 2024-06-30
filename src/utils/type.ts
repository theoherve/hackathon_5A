type PatientAlert = {
  subject: string;
  resume: string;
  advices: string[];
};

type AudioTransciption = {
  resume: string;
  keywords: string[];
};

type Stats = {
  resultat: {
    [key: string]: {
      positive: number;
      negative: number;
    };
  };
  avis: {
    [key: string]: string;
  };
};
