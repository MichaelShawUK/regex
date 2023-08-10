import dedent from "dedent";
import insertMatches from "../utils/insertMatches";

const data = [
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
    get text() {
      const text = dedent`SW@P
                          08123456789
                          0712345678
                          071234567890
                          SW@P
                          07123 45678
                          SW@P
                          +44712345678
                          SW@P`;

      return insertMatches(text, this.matches);
    },
  },
  {
    type: "find",
    instructions: "Find all hex colour values",
    matches: ["#efefef", "#ff0", "#9a4c12"],
    get text() {
      const text = dedent`color: red;
                          background-color: SW@P;
                          border: 2px solid SW@P;
                          background: linear-gradient(white, SW@P);
                          background-image: url("../images/dark#bg1")`;

      return insertMatches(text, this.matches);
    },
  },
  {
    type: "find",
    instructions: "Find all products IDs in this order",
    matches: ["sku235av", "sku190wa", "sku883fl"],
    get text() {
      const text = dedent`Order Summary:
                          Name: ReactJS
                          id: SW@P
                          Quantity: 1
                          Price: £49.99

                          Name: CSS3
                          id: SW@P
                          Quanity: 2
                          Price: £27.99

                          Name: HTML5
                          id: SW@P
                          Quanity: 5
                          Price: £10.00`;

      return insertMatches(text, this.matches);
    },
  },
];

export default data;
