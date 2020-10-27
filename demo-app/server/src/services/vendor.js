export class Vendor {
  constructor() {
    this._vendors = [
      {
        id: 1,
        firstName: 'A',
        lastName: 'B',
        companyName: 'Acme',
        ein: '123123123',
      },
      {
        id: 2,
        firstName: 'C',
        lastName: 'D',
        companyName: 'Tooling Company',
        ein: '234234234',
      },
    ];
  }

  all(options) {
    // returning a copy of the array

    const vendors = [...this._vendors];

    if (options?.sortField) {
      vendors.sort((a, b) => {
        if (a[options.sortField] < b[options.sortField]) {
          return -1;
        } else if (a[options.sortField] > b[options.sortField]) {
          return 1;
        } else {
          return 0;
        }
      });

      return vendors;
    }

    return [...this._vendors];
  }

  oneById(vendorId) {
    // return the first vendor object with the matching id
    return this._vendors.find((v) => v.id === vendorId);
  }
}
