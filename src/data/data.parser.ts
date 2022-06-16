// import { ILaucnhData } from './data.interface';

// const replacer = (replacements: any, str: string) => {
//   let result = str;
//   for (let [x, y] of replacements) result = result.replace(x, y);
//   return result;
// };

// const checkForFullDate = (str: string) => {};

// const dateParser = (date: string) => {
//   let output = replacer(
//     [
//       [',', ''],
//       [/jan(uary)?/gim, '01'],
//       [/feb(ruary)?/gim, '02'],
//       [/mar(c)?/gim, '03'],
//       [/apr(il)?/gim, '04'],
//       [/may/gim, '05'],
//       [/jun(e)?/gim, '06'],
//       [/jul(y)?/gim, '07'],
//       [/aug(ust)?/gim, '08'],
//       [/sep(tember)?/gim, '08'],
//       [/oct(ober)?/gim, '10'],
//       [/nov(ember)?/gim, '11'],
//       [/dec(ember)?/gim, '12'],
//       // [/([A-Z])/, ($0: any) => $0.toLowerCase()],
//     ],
//     date
//   );

//   return output.replace(/\W/gm, '-');
// };

// locale = 2022-06-10T08:33:36.861Z
// Construct = new Date('year-month-day')

// If full date => string + setDate : true
// If partial date => string + setDate : false
// string = date: "year-month-day"
