export const getPureNumberClub = function (segment: string) {
  if (/^\d+$/.test(segment)) {
    const n = segment.length;
    if (n == 3) {
      return '999 Club';
    } else if (n == 4) {
      return '10k Club';
    } else if (n == 5) {
      return '100k Club';
    }
  }
  return null;
};
