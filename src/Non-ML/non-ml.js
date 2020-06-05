var info;

var countries_mapping =
{
    410: "South Korea",
    156: "China",
    840: "United States",
    250: "France",
    76: "Brazil",
    276: "Germany",
    484: "Mexico",
    356: "India"
}
class Processor {
    constructor(c, n) {
        this.country = c;
        this.name = n;
        this.profit = 0
        this.average_rating = 0
        this.profit_score = 0
        this.satisfactory_score = 0
        this.final_score = 0
        this.fx_margin = 0
        this.revenue_share = 0
        this.percent_rate = 0
        this.flat_rate = 0
    }

    calc_finalscore(pw, sw) {
        this.final_score = this.profit_score * pw + this.satisfactory_score * sw;
    }

    calc_revenue(amount, isFx)
    {
        return isFx ? this.fx_margin * amount * this.revenue_share : 0.0;
    }
    calc_cost(amount)
    {
        return amount * this.percent_rate + this.flat_rate;
    }
    calc_profit(amount, isFx)
    {
        this.profit = this.calc_revenue(amount, isFx) - this.calc_cost(amount);
        return this.profit;
    }
}

const getXML = path =>
{
    let request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send();
    return request.responseXML;
}

const elementToProcessor = (processor, country, pname) =>
{
    var p = new Processor(country, pname);
    p.flat_rate = Number(processor.getElementsByTagName("flat_rate")[0].innerHTML)
    p.percent_rate = Number(processor.getElementsByTagName("percent_rate")[0].innerHTML.slice(0,-1))/100
    p.revenue_share = Number(processor.getElementsByTagName("revenue_share")[0].innerHTML.slice(0,-1))/100
    p.fx_margin = Number(processor.getElementsByTagName("fx_margin")[0].innerHTML.slice(0,-1))/100
    p.average_rating = Number(processor.getElementsByTagName("average_rating")[0].innerHTML)
    return p
}

// Do this onload 
export const init = () =>
{
    info = {};
    var resp = getXML("/updated.xml");
    var countries = resp.documentElement.children;
    for (var i = 0; i < countries.length; ++i)
    {
        var processors = countries[i].children[0].children;
        var country = countries[i].tagName.slice(1);
        if(!(country in info))
            info[country] = {};
        for(var j = 0; j < processors.length; ++j)
        {
            var processor = processors[j].tagName;
            info[country][processor] = elementToProcessor(processors[j], country, processor);
        }
    }
}

/**
 * Process a payment, outputs processors in sorted order.
 * @param {string} country  - target country code
 * @param {number} amount - payment amount
 * @param {boolean} isFx - is it foreign exchange?
 * @param {number} profit_weight - weight of profit
 * @param {number} satisfactory_weight - weight of satisfactory
 * @returns {array} sorted_keys - an array of sorted processors.
 * @returns {Object} processors - use this dinctionary to get detailed information for each sorted keys above.
 */
export const process_payment = (country, amount, isFx, profit_weight, satisfactory_weight) =>
{   
    var maxProfit = Number.NEGATIVE_INFINITY;
    var maxSatis  = Number.NEGATIVE_INFINITY;
    var processors = info[country];

    for(var p in processors)
    {
        maxProfit = Math.max(processors[p].calc_profit(amount, isFx), maxProfit);
        maxSatis = Math.max(processors[p].average_rating, maxSatis);
    }

    for(var p in processors)
    {
        var p_score = processors[p].profit / maxProfit;
        processors[p].profit_score = maxProfit < 0 ? -p_score : p_score;
        processors[p].satisfactory_score = processors[p].average_rating / maxSatis;
        processors[p].calc_finalscore(profit_weight, satisfactory_weight);
    }

    var sorted_keys = Object.keys(processors).sort((p1,p2) =>
        {
            if(processors[p1].final_score > processors[p2].final_score)
                return +1;
            else if(processors[p1].final_score < processors[p2].final_score)
                return -1;
            return 0;
        }
    )

    return {sorted_keys, processors};
}

// for testing ----------------------------------------
// init()
// console.log(process_payment(410, 100, true, 0.5, 0.5));
// for testing ----------------------------------------