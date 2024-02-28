import './styles/NetworkVisualization.css';

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import { WithContext } from '../utils/ReactDims';

function NetworkVisualization({ nodes, links, dims }) {
	const svgRef = useRef();
	const tooltipRef = useRef();

	console.log('NetworkVisualization: ', nodes, links);

	useEffect(() => {
		nodes.forEach((node) => {
			node.x = dims.width / 2;
			node.y = dims.height / 2;
		});

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
					.distance((d) => 0.6 / d.value)
			)
			.force('charge', d3.forceManyBody().strength(-750))
			.force('center', d3.forceCenter(dims.width / 2, dims.height / 2));

		const link = svg
			.append('g')
			.attr('class', 'links')
			.selectAll('line')
			.data(links)
			.enter()
			.append('line')
			.attr('stroke', '#5b5463')
			.attr('stroke-opacity', (d) => 20 / d.value)
			.attr('stroke-width', (d) => d.value * 2);

		const node = svg
			.append('g')
			.attr('class', 'nodes')
			.selectAll('circle')
			.data(nodes)
			.enter()
			.append('circle')
			.attr('r', 6)
			.attr('fill', '#3f3a45');

		node
			.on('mouseover', (event, d) => {
				tooltip
					.style('display', 'block')
					.style('left', `${event.pageX}px`)
					.style('top', `${event.pageY}px`)
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

		node.call(
			d3
				.drag()
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended)
		);

		// Define the drag started function.
		function dragstarted(event, d) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		// Define the drag function.
		function dragged(event, d) {
			d.fx = event.x;
			d.fy = event.y;
		}

		// Define the drag ended function.
		function dragended(event, d) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		return () => simulation.stop();
	}, [nodes, links, dims]);

	return (
		<div className="network" width={dims.width} height={dims.height}>
			<div>
				width~{dims.width}__ height~{dims.height}
			</div>
			<svg
				ref={svgRef}
				className="network-svg"
				style={{ width: '100%', height: '100%' }}
			></svg>
			<div
				ref={tooltipRef}
				className="tooltip"
				style={{ display: 'none' }}
			></div>
		</div>
	);
}

export default WithContext(NetworkVisualization);
