import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

export function NetworkVisualization(nodes, links) {
	const svgRef = useRef();
	const tooltipRef = useRef();

	useEffect(() => {
		const svg = d3.select(svgRef.current);
		const tooltip = d3.select(tooltipRef.current);
		svg.selectAll('*').remove();

		const simulation = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d) => d.id)
					.distance((d) => 20 / d.value)
			)
			.force('charge', d3.forceManyBody().strength(-1000))
			.force('center', d3.forceCenter(450, 300));

		const link = svg
			.append('g')
			.attr('class', 'links')
			.selectAll('line')
			.data(links)
			.enter()
			.append('line')
			.attr('stroke', 'black')
			.attr('stroke-opacity', (d) => 1000 / d.value)
			.attr('stroke-width', (d) => d.value * 2);

		const node = svg
			.append('g')
			.attr('class', 'nodes')
			.selectAll('circle')
			.data(nodes)
			.enter()
			.append('circle')
			.attr('r', 10) // Radius of the nodes
			.attr('fill', 'black'); // Fill color of the nodes

		node
			.on('mouseover', (event, d) => {
				tooltip
					.style('display', 'block')
					.style('left', `${event.pageX + 10}px`)
					.style('top', `${event.pageY + 10}px`)
					.text(d.title);
			})
			.on('mouseout', () => {
				tooltip.style('display', 'none');
			});

		simulation.on('tick', () => {
			// Update link positions
			link
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			// Update node positions
			node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
		});

		return () => simulation.stop();
	}, []);

	return (
		<div className="insights-network">
			<svg ref={svgRef} width={900} height={800}></svg>
			<div
				ref={tooltipRef}
				className="tooltip"
				style={{ display: 'none' }}
			></div>
		</div>
	);
}
