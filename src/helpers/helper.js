const getErrorStrings = (lines) =>
  lines.map((lineNumber) => `line ${lineNumber} wrong amount`);

export const getErrorForAmounts = (text) => {
  const lines = text.split("\n").filter((i) => i !== '');
  console.log({text,lines})
  const wrongAmountLines = [];

  for (let i = 0; i < lines.length; i++) {
    const addressWithAmount = lines[i].split(/[=, ]/);
    const amount = addressWithAmount[1] && addressWithAmount[1].trim();
    if (isNaN(amount)) {
      wrongAmountLines.push(i + 1);
    }
  }
  return getErrorStrings(wrongAmountLines);
};

const getErrorStringsForInvalidAddresses = (lines) =>
  lines.map((lineNumber) => `line ${lineNumber} invalid address`);

export const getErrorForInvalidAddresses = (text) => {
  const lines = text.split("\n").filter((i) => i !== '');;
  console.log({text,lines})
  const invalidAddressLines = [];

  for (let i = 0; i < lines.length; i++) {
    const addressWithAmount = lines[i].split(/[=, ]/);
    const address = addressWithAmount[0].trim();
    if (address.length !== 40 || address.slice(0, 2) !== "0x") {
      invalidAddressLines.push(i + 1);
    }
  }
  return getErrorStringsForInvalidAddresses(invalidAddressLines);
};

export const getErrorForDuplicateAddresses = (text) => {
  const lines = text.split("\n").filter((i) => i !== '');;
  console.log({text,lines})
  const addressesWithAmounts = [];
  let addressCountObj = {};

  for (let i = 0; i < lines.length; i++) {
    const addressWithAmount = lines[i].split(/[=, ]/);
    if (addressCountObj[addressWithAmount[0]])
      addressCountObj[addressWithAmount[0]] = {
        ...addressCountObj[addressWithAmount[0]],
        count: addressCountObj[addressWithAmount[0]].count + 1,
        lines: [...addressCountObj[addressWithAmount[0]].lines, i + 1]
      };
    else addressCountObj[addressWithAmount[0]] = { count: 1, lines: [i + 1] };
    addressesWithAmounts.push(addressWithAmount);
  }
  let duplicateAddressVsLines = {};
  for (const address in addressCountObj) {
    if (addressCountObj[address].count && addressCountObj[address].count > 1) {
      duplicateAddressVsLines[address] = addressCountObj[address].lines;
    }
  }
  return { duplicateAddressVsLines };
};

export const getErrorStringsForDuplicateAddresses = (
  duplicateAddressVsLines
) => {
  let errorStrings = [];
  for (const address in duplicateAddressVsLines) {
    const errString = `Address ${address} encountered duplicate in line : ${duplicateAddressVsLines[
      address
    ].join(",")}`;
    errorStrings.push(errString);
  }
  return errorStrings;
};

export const getCombinedAddresses = (text, duplicateAddressesVsLines) => {
  const lines = text.split("\n").filter((i) => i !== '');;
  console.log({text,lines})
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]) {
      const line = lines[i].split(/[=, ]/);
      const duplicateAddress = duplicateAddressesVsLines[line[0]];
      if (duplicateAddress) {
        let amountSum = duplicateAddress.reduce((acc, lineNumber) => {
          if (lines[lineNumber - 1].split(/[=, ]/)[1])
            return acc + Number(lines[lineNumber - 1].split(/[=, ]/)[1]);
        }, 0);
        lines[i] = lines[i].split(" ")[0] + " " + amountSum;
        duplicateAddress.slice(1).forEach((index) => (lines[index - 1] = null));
      }
    }
  }

  return lines.filter((address) => address !== null).join("\n");
};

export const getKeepFirstOneAddresses = (text, duplicateAddressVsLines) => {
  const lines = text.split("\n").filter((i) => i !== '');;
  console.log({text,lines})
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]) {
      const line = lines[i].split(/[=, ]/);
      const duplicateAddress = duplicateAddressVsLines[line[0]];
      if (duplicateAddress) {
        duplicateAddress.slice(1).forEach((index) => (lines[index - 1] = null));
      }
    }
  }

  return lines.filter((address) => address !== null).join("\n");
};
