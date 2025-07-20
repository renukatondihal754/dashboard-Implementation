import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DonutChartProps {
  data: any[];
  dataKey: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, dataKey }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length) return;

    const latestQuarter = data
      .map(d => d.closed_fiscal_quarter)
      .sort()
      .reverse()[0];

    const latestData = data.filter(d => d.closed_fiscal_quarter === latestQuarter);

    const grouped = d3.rollup(
      latestData,
      v => d3.sum(v, d => d.acv),
      d => d[dataKey]
    );

    const total = Array.from(grouped.values()).reduce((a, b) => a + b, 0);

    const pie = d3.pie<[string, number]>()
      .value(d => d[1]);

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const arc = d3.arc<d3.PieArcDatum<[string, number]>>()
      .innerRadius(radius * 0.4)
      .outerRadius(radius - 5);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeSet2);

    const arcs = pie(Array.from(grouped.entries()));

    // Donut segments
    g.selectAll("path")
      .data(arcs)
      .join("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data[0]))
      .attr("stroke", "#fff");

    // Inner total value
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("y", -10)
      .style("font-size", "18px")
      .text("Total");

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("y", 12)
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(`$${(total / 1000).toFixed(0)}K`);

    // Arrows + labels
    arcs.forEach((arcData, i) => {
      const [label, value] = arcData.data;
      const percent = ((value / total) * 100).toFixed(0);
      const pos = arc.centroid(arcData);
      g.append("text")
        .attr("x", pos[0] * 1.5)
        .attr("y", pos[1] * 1.5)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(`$${(value / 1000).toFixed(0)}K (${percent}%)`);
    });
  }, [data, dataKey]);

  return <svg ref={svgRef}></svg>;
};

export default DonutChart;
