const calculateCommission = (omzet) => {
  if (omzet >= 500000000) {
    return { percent: 10, nominal: omzet * 0.1 };
  } else if (omzet >= 200000000) {
    return { percent: 5, nominal: omzet * 0.05 };
  } else if (omzet >= 100000000) {
    return { percent: 2.5, nominal: omzet * 0.025 };
  } else {
    return { percent: 0, nominal: 0 };
  }
};

module.exports = calculateCommission;
