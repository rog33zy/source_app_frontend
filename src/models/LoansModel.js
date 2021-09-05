export class LoansModel {
  constructor(
    district,
    partnerOrganization,
    totalSeedAmountPurchased,
    totalNumberOfLoans,
    totalInitialAmountPaid,
    totalSeedOwing,
    totalAmountOwing,
    totalSeedQuantityPaid,
    totalSubsequentAmountPaid,
    totalSeedQuantityPurchased,
    totalSeedValuePurchased
  ) {
    this.district = district;
    this.partnerOrganization = partnerOrganization;
    this.totalSeedAmountPurchased = totalSeedAmountPurchased;
    this.totalNumberOfLoans = totalNumberOfLoans;
    this.totalInitialAmountPaid = totalInitialAmountPaid;
    this.totalSeedOwing = totalSeedOwing;
    this.totalAmountOwing = totalAmountOwing;
    this.totalSeedQuantityPaid = totalSeedQuantityPaid;
    this.totalSubsequentAmountPaid = totalSubsequentAmountPaid;
    this.totalSeedQuantityPurchased = totalSeedQuantityPurchased;
    this.totalSeedValuePurchased = totalSeedValuePurchased;
  }
}
