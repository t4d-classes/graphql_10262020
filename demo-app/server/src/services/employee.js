export class Employee {
  constructor() {
    this._employees = [
      {
        id: 1,
        firstName: 'A',
        lastName: 'B',
        ssn: '123123123',
      },
      {
        id: 2,
        firstName: 'C',
        lastName: 'D',
        ssn: '234234234',
      },
    ];
  }

  all(options) {
    // returning a copy of the array

    const employees = [...this._employees];

    if (options?.sortField) {
      employees.sort((a, b) => {
        if (a[options.sortField] < b[options.sortField]) {
          return -1;
        } else if (a[options.sortField] > b[options.sortField]) {
          return 1;
        } else {
          return 0;
        }
      });

      return employees;
    }

    return [...this._employees];
  }

  oneById(employeeId) {
    // return the first employee object with the matching id
    return this._employees.find((e) => e.id === employeeId);
  }

  oneBySSN(employeeSSN) {
    // return the first employee object with the matching id
    return this._employees.find((e) => e.ssn === employeeSSN);
  }

  append(employee) {
    const newEmployee = {
      ...employee,
      // find the max employee id in the array, then add 1 to it
      id: Math.max(...this._employees.map((a) => a.id), 0) + 1,
    };

    this._employees = [...this._employees, newEmployee];

    return newEmployee;
  }

  remove(employeeId) {
    const employee = this._employees.find((e) => e.id === employeeId);

    this._employees = this._employees.filter((e) => e.id !== employeeId);

    return employee;
  }
}
