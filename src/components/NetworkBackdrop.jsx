import React from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

const nodes = [
  [70,130],[210,210],[350,115],[485,280],[625,170],[760,335],[900,205],[1045,300],[1130,115],
  [145,540],[330,635],[520,500],[705,650],[900,535],[1080,665],
]
const edges = [[0,1],[1,2],[1,3],[2,4],[3,4],[3,5],[4,6],[5,6],[5,7],[6,8],[1,9],[9,10],[3,11],[10,11],[11,12],[5,13],[12,13],[13,14],[7,14]]
const paths = [
  'M70 130 L210 210',
  'M350 115 L625 170',
  'M520 500 L705 650',
]

export default function NetworkBackdrop({ dense = false, global = false }) {
  const reducedMotion = useReducedMotion()
  return (
    <div className={`network-backdrop ${dense ? 'dense' : ''} ${global ? 'global' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`ambient-line-${global ? 'global' : 'local'}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#13a9ff" stopOpacity=".04" />
            <stop offset="50%" stopColor="#31e8ff" stopOpacity=".2" />
            <stop offset="100%" stopColor="#69ffb2" stopOpacity=".035" />
          </linearGradient>
          <filter id={`ambient-glow-${global ? 'global' : 'local'}`} x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>
        <g className="ambient-net-lines">
          {edges.map(([a,b], index) => <line key={`${a}-${b}`} className={index > 12 ? 'ambient-mobile-hide' : index > 8 ? 'ambient-tablet-hide' : ''} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={`url(#ambient-line-${global ? 'global' : 'local'})`} />)}
        </g>
        <g className="ambient-net-nodes">
          {nodes.map(([x,y], index) => <g key={index} className={`${index > 7 ? 'ambient-tablet-hide' : ''} ${index > 6 ? 'ambient-mobile-hide' : ''} drift-${index % 4}`}><circle cx={x} cy={y} r={index % 5 === 0 ? 3 : 2} /><circle cx={x} cy={y} r="8" className="ambient-node-ring" /></g>)}
        </g>
        {!reducedMotion && paths.slice(0, dense ? 3 : global ? 2 : 1).map((path, index) => (
          <g key={path} className={index > 0 ? 'ambient-mobile-hide' : ''}>
            <path id={`ambient-path-${global ? 'g' : 'l'}-${index}`} d={path} className="ambient-motion-path" />
            <circle r="2.4" className="ambient-packet" filter={`url(#ambient-glow-${global ? 'global' : 'local'})`}>
              <animateMotion dur={`${2.8 + index * .55}s`} begin={`${index * 1.4}s`} repeatCount="indefinite" path={path} />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}
