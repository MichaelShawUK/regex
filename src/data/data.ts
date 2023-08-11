import dedent from "dedent";
import insertMatches from "../utils/insertMatches";
import { FindLevel, ReplaceLevel } from "../types";

const data: Array<FindLevel | ReplaceLevel> = [
  {
    type: "find",
    instructions:
      "UK mobile phone numbers are made up of 11 digits and begin with 07xxx xxxxxx. For international calls the first zero is replaced with +44. Find a regular expression that matches the different formats a UK mobile phone number can take.",
    matches: [
      "07123456789",
      "07123 456789",
      "+447123456789",
      "+44 7123 456789",
    ],
    template: dedent`SW@P
                     08123456789
                     0712345678
                     071234567890
                     SW@P
                     07123 45678
                     SW@P
                     +44712345678
                     SW@P`,
    get text() {
      return insertMatches(this.template, this.matches);
    },
  },
  {
    type: "find",
    instructions: "Find all hex colour values",
    matches: ["#efefef", "#ff0", "#9a4c12"],
    template: dedent`color: red;
                     background-color: SW@P;
                     border: 2px solid SW@P;
                     background: linear-gradient(white, SW@P);
                     background-image: url("../images/dark#bg1")`,
    get text() {
      return insertMatches(this.template, this.matches);
    },
  },
  {
    type: "find",
    instructions: "Find all products IDs in this order",
    matches: ["sku235av", "sku190wa", "sku883fl"],
    template: dedent`Order Summary:
                     Name: ReactJS
                     id: SW@P
                     Quantity: 1
                     Price: £49.99

                     Name: CSS3
                     id: SW@P
                     Quantity: 2
                     Price: £27.99

                     Name: HTML5
                     id: SW@P
                     Quantity: 5
                     Price: £10.00`,
    get text() {
      return insertMatches(this.template, this.matches);
    },
  },
  {
    type: "replace",
    instructions:
      "The last argument to the rgba function sets the alpha channel, with 0 being fully transparent and 1 being fully opaque. Set all RGBA colours to fully opaque.",
    matches: ["0.3", "0.5"],
    template: dedent`font-size: 12px;
                     line-height: 0.8;
                     background-color: rgba(255, 255, 255, SW@P);
                     color: rgb(10, 10, 10);
                     border: 2px solid rgba(100, 25, 0, SW@P);`,
    get text() {
      return insertMatches(this.template, this.matches);
    },
    replacements: ["1", "1"],
    get reference() {
      return insertMatches(this.template, this.replacements);
    },
  },
];

export default data;

// const level1: FindLevel = {
//   type: "find",
//   instructions:
//     "UK mobile phone numbers are made up of 11 digits and begin with 07xxx xxxxxx. For international calls the first zero is replaced with +44. Find a regular expression that matches the different formats a UK mobile phone number can take.",
//   matches: [
//     "07123456789",
//     "07123 456789",
//     "+447123456789",
//     "+44 7123 456789",
//   ],
//   get text() {
//     const text = dedent`SW@P
//                         08123456789
//                         0712345678
//                         071234567890
//                         SW@P
//                         07123 45678
//                         SW@P
//                         +44712345678
//                         SW@P`;

//     return insertMatches(text, this.matches);
//   },
// }

// const level4: ReplaceLevel = {
//   type: "replace",
//     instructions:
//       "The last argument to the rgba function sets the alpha channel, with 0 being fully transparent and 1 being fully opaque. Set all RGBA colours to fully opaque.",
//     matches: ["0.3", "0.5"],
//     template: dedent`font-size: 12px;
//                      line-height: 0.8;
//                      background-color: rgba(255, 255, 255, SW@P);
//                      color: rgb(10, 10, 10);
//                      border: 2px solid rgba(100, 25, 0, SW@P);`,
//     get text() {
//       return insertMatches(this.template, this.matches);
//     },
//     replacements: ["1", "1"],
//     get reference() {
//       return insertMatches(this.template, this.replacements);
//     },

// }

// const level1and4: Array<FindLevel | ReplaceLevel> = [level1, level4, level4, level1, {
//   type: "replace",
//     instructions:
//       "The last argument to the rgba function sets the alpha channel, with 0 being fully transparent and 1 being fully opaque. Set all RGBA colours to fully opaque.",
//     matches: ["0.3", "0.5"],
//     template: dedent`font-size: 12px;
//                      line-height: 0.8;
//                      background-color: rgba(255, 255, 255, SW@P);
//                      color: rgb(10, 10, 10);
//                      border: 2px solid rgba(100, 25, 0, SW@P);`,
//     get text() {
//       return insertMatches(this.template, this.matches);
//     },
//     replacements: ["1", "1"],
//     get reference() {
//       return insertMatches(this.template, this.replacements);
//     },

// }, {
//   type: "find",
//   instructions: "Find all products IDs in this order",
//   matches: ["sku235av", "sku190wa", "sku883fl"],
//   template: dedent`Order Summary:
//                    Name: ReactJS
//                    id: SW@P
//                    Quantity: 1
//                    Price: £49.99

//                    Name: CSS3
//                    id: SW@P
//                    Quantity: 2
//                    Price: £27.99

//                    Name: HTML5
//                    id: SW@P
//                    Quantity: 5
//                    Price: £10.00`,
//   get text() {

//     return insertMatches(this.template, this.matches);
//   },
// }]
