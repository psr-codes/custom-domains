// some notes here

const tokenomics = {
    ticker: "ABC",
    name: "ABC Token",
    chain: "Binance Smart Chain",
    supply: 1000000000,
    decimals: 18,
    initialSupply: 1000000,
    maxSupply: 1000000000,
    burnable: true,
    mintable: true,
};

const socials = {
    twitter: "https://twitter.com/abc",
    telegram: "https://t.me/abc",
    discord: "https://discord.gg/abc",
    site: ["https://abc.com"],
    other: [
        {
            name: "Reddit",
            url: "https://reddit.com/r/abc",
        },
        {
            name: "Medium",
            url: "https://medium.com/abc",
        },
    ],
};

// current = initial + initial * gain /100
// current = intial (1+ gain/100)

// intial/current = 1/(1+gain/100)

// sell_ammount = initial;
// sell_percent = initial/ current * 100

// sell_percent = 1/(1+gain/100) * 100

// sell_percent = 100/ (1 + 0.01 * gain%)
