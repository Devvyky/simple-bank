export class UtilService {
  genereteAccountNumber() {
    let result = '';
    const numeric_values = '1234567890';
    const length = 10;

    for (let i = 0; i < length; i++) {
      result += numeric_values.charAt(
        Math.floor(Math.random() * numeric_values.length),
      );
    }

    return result;
  }
}
