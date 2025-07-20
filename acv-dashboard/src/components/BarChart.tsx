// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// interface BarChartProps {
//   data: any[];
//   dataKey: string;
// }

// const BarChart: React.FC<BarChartProps> = ({ data, dataKey }) => {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     if (!data.length) return;

//     const width = 500;
//     const height = 300;
//     const margin = { top: 30, right: 30, bottom: 60, left: 80 };

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     const grouped = d3.group(data, d => d.closed_fiscal_quarter);
//     const quarters = Array.from(grouped.keys()).sort();

//     const stackKeys = Array.from(new Set(data.map(d => d[dataKey])));
//     const color = d3.scaleOrdinal(d3.schemeSet2).domain(stackKeys);

//     const stackData = quarters.map(q => {
//       const entries = grouped.get(q) || [];
//       const groupedByKey = d3.rollup(
//         entries,
//         v => d3.sum(v, d => d.acv),
//         d => d[dataKey]
//       );
//       const result: any = { quarter: q };
//       stackKeys.forEach(k => {
//         result[k] = groupedByKey.get(k) || 0;
//       });
//       return result;
//     });

//     const x = d3
//       .scaleBand()
//       .domain(quarters)
//       .range([margin.left, width - margin.right])
//       .padding(0.3);

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(stackData, d => d3.sum(stackKeys, k => d[k])) || 0])
//       .nice()
//       .range([height - margin.bottom, margin.top]);

//     const stack = d3.stack().keys(stackKeys);
//     const series = stack(stackData);

//     svg.attr("width", width).attr("height", height);

//     svg
//       .append("g")
//       .selectAll("g")
//       .data(series)
//       .join("g")
//       .attr("fill", d => color(d.key))
//       .selectAll("rect")
//       .data(d => d)
//       .join("rect")
//       .attr("x", d => x(String(d.data.quarter))!)
//       .attr("y", d => y(d[1]))
//       .attr("height", d => y(d[0]) - y(d[1]))
//       .attr("width", x.bandwidth());

//     // Y Axis
//     svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},0)`)
//       .call(
//         d3.axisLeft(y).tickFormat(d => `$${(+d / 1e6).toFixed(1)}M`)
//       )
//       .call(g => g.select(".domain").remove());

//     // X Axis
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height - margin.bottom})`)
//       .call(d3.axisBottom(x))
//       .append("text")
//       .attr("x", width / 2)
//       .attr("y", 40)
//       .attr("fill", "black")
//       .attr("text-anchor", "middle")
//       .text("Closed Fiscal Quarter");

//     // Legend
//     const legend = svg
//       .append("g")
//       .attr("transform", `translate(${width - 130},${margin.top})`);

//     stackKeys.forEach((key, i) => {
//       const yPos = i * 20;
//       legend
//         .append("rect")
//         .attr("x", 0)
//         .attr("y", yPos)
//         .attr("width", 12)
//         .attr("height", 12)
//         .attr("fill", color(key));

//       legend
//         .append("text")
//         .attr("x", 18)
//         .attr("y", yPos + 10)
//         .style("font-size", "12px")
//         .text(key);
//     });
//   }, [data, dataKey]);

//   return <svg ref={svgRef}></svg>;
// };

// export default BarChart;




import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface BarChartProps {
  data: any[];
  dataKey: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, dataKey }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length) return;

    const width = 500;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 60, left: 80 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const grouped = d3.group(data, d => d.closed_fiscal_quarter);
    const quarters = Array.from(grouped.keys()).sort();

    const stackKeys = Array.from(new Set(data.map(d => d[dataKey])));
    const color = d3.scaleOrdinal(d3.schemeSet2).domain(stackKeys);

    const stackData = quarters.map(q => {
      const entries = grouped.get(q) || [];
      const groupedByKey = d3.rollup(
        entries,
        v => d3.sum(v, d => d.acv),
        d => d[dataKey]
      );
      const result: any = { quarter: q };
      stackKeys.forEach(k => {
        result[k] = groupedByKey.get(k) || 0;
      });
      return result;
    });

    const x = d3
      .scaleBand()
      .domain(quarters)
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(stackData, d => d3.sum(stackKeys, k => d[k])) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const stack = d3.stack().keys(stackKeys);
    const series = stack(stackData);

    svg.attr("width", width).attr("height", height);

    // Bars
    svg
      .append("g")
      .selectAll("g")
      .data(series)
      .join("g")
      .attr("fill", d => color(d.key))
      .selectAll("rect")
      .data(d => d)
      .join("rect")
      .attr("x", d => x(String(d.data.quarter))!)
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    // Add Numbering on each stack
    svg
      .append("g")
      .selectAll("g")
      .data(series)
      .join("g")
      .selectAll("text")
      .data(d => d)
      .join("text")
      .attr("x", d => x(String(d.data.quarter))! + x.bandwidth() / 2)
      .attr("y", d => y(d[1]) + 12)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "white")
      .text(d => {
        const value = d[1] - d[0];
        return value > 0 ? `$${(value / 1e6).toFixed(1)}M` : "";
      });

    // Y Axis
    // svg
    //   .append("g")
    //   .attr("transform", `translate(${margin.left},0)`)
    //   .call(
    //     d3.axisLeft(y).tickFormat(d => `$${(+d / 1e6).toFixed(1)}M`)
    //   )
    //   .call(g => g.select(".domain").remove());

// Y Axis Gridlines
svg.append("g")
  .attr("class", "grid")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(
    d3.axisLeft(y)
      .tickSize(-(width - margin.left - margin.right))
      .tickFormat(() => "")
  )
  .call(g => g.select(".domain").remove())
  // .call(g => g.selectAll("line")
  //   .attr("stroke", "#2f4f4f")
  //   .attr("stroke-dasharray", "2,2")
  // );
  .call(g => g.selectAll("line")
  .attr("stroke", "#ececef")  // solid black
);


// Y Axis Labels
svg
  .append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(
    d3.axisLeft(y).tickFormat(d => `$${(+d / 1e6).toFixed(1)}M`)
  )
  .call(g => g.select(".domain").remove());



    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Closed Fiscal Quarter");

    // Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 130},${margin.top})`);

    stackKeys.forEach((key, i) => {
      const yPos = i * 20;
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", yPos)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", color(key));

      legend
        .append("text")
        .attr("x", 18)
        .attr("y", yPos + 10)
        .style("font-size", "12px")
        .text(key);
    });
  }, [data, dataKey]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
