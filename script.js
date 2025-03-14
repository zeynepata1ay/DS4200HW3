const data = [
    { topic: "Educational Videos", mentions: 18000 },
    { topic: "TikTok Ban Discussions", mentions: 14500 },
    { topic: "Meme Culture", mentions: 12000 },
    { topic: "Instagram Algorithm Changes", mentions: 9800 },
    { topic: "YouTube Shorts Growth", mentions: 11000 }
];

// Set up SVG canvas dimensions
const width = 600, height = 400;
const margin = { top: 40, bottom: 60, left: 80, right: 40 };

const svg = d3.select("#trend-chart")
    .attr("width", width)
    .attr("height", height);

const xScale = d3.scaleBand()
    .domain(data.map(d => d.topic))
    .range([margin.left, width - margin.right])
    .padding(0.3);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.mentions)])
    .range([height - margin.bottom, margin.top]);

// Add bars
svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", d => xScale(d.topic))
    .attr("y", d => yScale(d.mentions))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScale(d.mentions))
    .attr("fill", "#1DA1F2");

// Add X-axis
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "rotate(-10)")
    .style("text-anchor", "end");

// Add Y-axis
svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));
