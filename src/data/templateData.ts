import dedent from "dedent";
import insertMatches from "../utils/insertMatches";
import getMatchPositions from "../utils/getMatchPositions";
import highlightMatches from "../utils/highlightMatches";
import { BaseLevel, BaseLevelWithGetters } from "../types";

const templateData: Array<BaseLevel> = [
  {
    type: "find",
    instructions: [
      "Regular expressions are extremely useful for processing text. Some of their uses include extracting information from large datasets, validating user input, finding and replacing data among many other uses.",
      "The syntax for regular expressions can be intimidating and so this interactive tutorial aims to break down the various elements that make up a regular expression pattern.",
      "Enter your pattern to match the string highlighted in blue. To get started enter 'location'.",
    ],
    matches: ["location"],
    template: dedent`key: string;
                     keyCode: number; 
                     locale: string;
                     location: number;
                     metaKey: boolean;
                     repeat: boolean;
                     shiftKey: boolean;
                     which: number;
    `,
  },
  {
    type: "find",
    instructions: [
      "Entering the exact string is not particularly useful. You can use special characters in your pattern to match certain data.",
      "To match all digits 0-9 use the \\d character.",
      "The \\d character is a shorthand convenience for the pattern [0-9]. These can be used interchangably, try both \\d and [0-9].",
    ],
    matches: ["3", "2", "7"],
    template: dedent`id: e3,
                     name: widget,
                     quanity: 2,
                     location: UK,
                     price: 7
    `,
  },
  {
    type: "find",
    instructions: [
      "Similarly, you can use the \\w character to match any character that is a letter or number. This is equivalent to the range [0-9a-zA-Z].",
      "If you enter \\w twice in your pattern it will match any substring where an alphanumeric character is followed by a second alphanumberic character.",
      "You can combine characters in your pattern, use the \\d and \\w characters to match the product ids.",
    ],
    matches: ["i7", "d4"],
    template: dedent`id: i7,            id: d4,
                     name: MacBook,     name: Inspiron,
                     quanity: 1,        quanity: 2,
                     brand: Apple,      brand: Dell,
                     price: 849         price: 649
    `,
  },
  {
    type: "find",
    instructions: [
      "If you wanted to search for a 4-digit number you could use the pattern \\d\\d\\d\\d, but it is more convenient to use a quantifier.",
      "You can specify how many instances of the previous character you want to search for using curly braces.",
      "For example, to find all 4-digit numbers use the pattern \\d{4}",
    ],
    matches: ["2007", "2000", "1986", "1976", "1972"],
    template: dedent`Year - Oscar Winner
                     SW@P - No Country for Old Men
                     SW@P - Gladiator
                     SW@P - Platoon
                     SW@P - Rocky
                     SW@P - The Godfather
    `,
  },
  {
    type: "find",
    instructions: [
      "Sometimes you want to find the previous character at least n times but no more than m times.",
      "In this scenario you would use the quantifier {n, m}.",
      "Find the countries whose population is greater than 1 million but less than 100 million.",
    ],
    matches: ["36684202", "18190484", "5056935", "58870762", "85816199"],
    template: dedent`Country      Population
                     Angola       SW@P
                     Brazil       216422446
                     China        1425671352
                     Ecuador      SW@P
                     Fiji         936375
                     Iceland      375318
                     Ireland      SW@P
                     Italy        SW@P
                     Mexico       128455567
                     Turkey       SW@P
    `,
  },
  {
    type: "find",
    instructions: [
      "UK mobile phone numbers are made up of 11 digits and begin with 07xxx xxxxxx. For international calls the first zero is replaced with +44. Find a regular expression that matches the different formats a UK mobile phone number can take.",
    ],
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
  },
  {
    type: "find",
    instructions: ["Find all hex colour values"],
    matches: ["#efefef", "#ff0", "#9a4c12"],
    template: dedent`color: red;
                     background-color: SW@P;
                     border: 2px solid SW@P;
                     background: linear-gradient(white, SW@P);
                     background-image: url("../images/dark#bg1")`,
  },
  {
    type: "find",
    instructions: ["Find all products IDs in this order"],
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
  },
  {
    type: "replace",
    instructions: [
      "The last argument to the rgba function sets the alpha channel, with 0 being fully transparent and 1 being fully opaque. Set all RGBA colours to fully opaque.",
    ],
    matches: ["0.3", "0.5"],
    template: dedent`font-size: 12px;
                     line-height: 0.8;
                     background-color: rgba(255, 255, 255, SW@P);
                     color: rgb(10, 10, 10);
                     border: 2px solid rgba(100, 25, 0, SW@P);`,
    replacements: ["1", "1"],
  },
];

const templateDataWithGetters: Array<BaseLevelWithGetters> = templateData.map(
  (data) => {
    const text = insertMatches(data.template, data.matches);
    const matchPositions = getMatchPositions(text, data.matches);
    const initialJsx = highlightMatches(text, [...matchPositions.keys()]);

    const dataObj = {
      ...data,
      get text() {
        return text;
      },
      get matchPositions() {
        return matchPositions;
      },
      get initialJsx() {
        return initialJsx;
      },
    };

    if (!data.replacements) return dataObj;

    const reference = insertMatches(data.template, data.replacements);
    return {
      ...dataObj,
      get reference() {
        return reference;
      },
    };
  }
);

export default templateDataWithGetters;
