type Version = Array<number>;

export const convertString2Arr = (logId: string): Version =>
  logId
    .replace('v', '')
    .split('.')
    .map(value => Number(value));

export const convertArr2String = (version: Version): string => `v${version.join('.')}`;

export const compareVersionArr = (logA: Version, logB: Version): number => {
  for (let i = 0; i < logA.length; i += 1) {
    if (logA[i] > logB[i]) return -1;
    else if (logA[i] < logB[i]) return 1;
  }
  return 0;
};
