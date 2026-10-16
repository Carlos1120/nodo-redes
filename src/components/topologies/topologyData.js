const node = (id, label, x, y, kind = 'device', selectable = true) => ({ id, label, x, y, kind, selectable })
const edge = (id, a, b, path) => ({ id, a, b, path })

export const modeDescriptions = {
  unicast: { label: 'Envío normal', description: 'El paquete viaja hacia un dispositivo específico.' },
  broadcast: { label: 'Broadcast', description: 'El mensaje se envía a todos los dispositivos de la red local.' },
}

export const topologies = {
  Estrella: {
    id: 'Estrella', text: 'Cada equipo se conecta a un switch central, que dirige el tráfico hacia el puerto necesario.', defaults: ['b', 'c'],
    nodes: { a: node('a', 'PC A', 50, 12), b: node('b', 'PC B', 14, 50), switch: node('switch', 'SWITCH', 50, 50, 'switch', false), c: node('c', 'PC C', 86, 50), d: node('d', 'PC D', 50, 88) },
    edges: [edge('a-switch', 'a', 'switch'), edge('b-switch', 'b', 'switch'), edge('switch-c', 'switch', 'c'), edge('switch-d', 'switch', 'd')],
  },
  Bus: {
    id: 'Bus', text: 'Todos los equipos comparten un cable principal. La señal recorre ese medio hasta la posición del destino.', defaults: ['a', 'd'],
    nodes: {
      a: node('a', 'PC A', 14, 22), b: node('b', 'PC B', 38, 78), c: node('c', 'PC C', 62, 22), d: node('d', 'PC D', 86, 78),
      ta: node('ta', '', 14, 50, 'junction', false), tb: node('tb', '', 38, 50, 'junction', false), tc: node('tc', '', 62, 50, 'junction', false), td: node('td', '', 86, 50, 'junction', false),
    },
    edges: [edge('stub-a', 'a', 'ta'), edge('trunk-ab', 'ta', 'tb'), edge('stub-b', 'tb', 'b'), edge('trunk-bc', 'tb', 'tc'), edge('stub-c', 'c', 'tc'), edge('trunk-cd', 'tc', 'td'), edge('stub-d', 'td', 'd')],
  },
  Anillo: {
    id: 'Anillo', text: 'Cada equipo se conecta con el siguiente. El paquete avanza por el circuito y atraviesa los nodos intermedios.', defaults: ['a', 'd'], directedOrder: ['a', 'b', 'c', 'd'],
    nodes: { a: node('a', 'Nodo A', 50, 10), b: node('b', 'Nodo B', 90, 50), c: node('c', 'Nodo C', 50, 90), d: node('d', 'Nodo D', 10, 50) },
    edges: [edge('ring-ab', 'a', 'b', 'M 50 10 Q 90 10 90 50'), edge('ring-bc', 'b', 'c', 'M 90 50 Q 90 90 50 90'), edge('ring-cd', 'c', 'd', 'M 50 90 Q 10 90 10 50'), edge('ring-da', 'd', 'a', 'M 10 50 Q 10 10 50 10')],
  },
  Malla: {
    id: 'Malla', text: 'Las conexiones redundantes ofrecen distintas rutas. La simulación resalta únicamente el camino elegido.', defaults: ['a', 'd'],
    nodes: { a: node('a', 'Nodo A', 18, 20), b: node('b', 'Nodo B', 82, 20), c: node('c', 'Nodo C', 18, 80), d: node('d', 'Nodo D', 82, 80) },
    edges: [edge('mesh-ab', 'a', 'b'), edge('mesh-ac', 'a', 'c'), edge('mesh-ad', 'a', 'd'), edge('mesh-bc', 'b', 'c'), edge('mesh-bd', 'b', 'd'), edge('mesh-cd', 'c', 'd')],
  },
  Árbol: {
    id: 'Árbol', text: 'La estructura jerárquica hace que el paquete suba hasta un punto común y después baje hacia su destino.', defaults: ['pc1', 'pc4'],
    nodes: {
      root: node('root', 'NODO PRINCIPAL', 50, 9, 'root', false), swa: node('swa', 'SWITCH A', 27, 40, 'switch', false), swb: node('swb', 'SWITCH B', 73, 40, 'switch', false),
      pc1: node('pc1', 'PC 1', 12, 82), pc2: node('pc2', 'PC 2', 38, 82), pc3: node('pc3', 'PC 3', 62, 82), pc4: node('pc4', 'PC 4', 88, 82),
    },
    edges: [edge('root-a', 'root', 'swa'), edge('root-b', 'root', 'swb'), edge('a-pc1', 'swa', 'pc1'), edge('a-pc2', 'swa', 'pc2'), edge('b-pc3', 'swb', 'pc3'), edge('b-pc4', 'swb', 'pc4')],
  },
}

function adjacency(topology) {
  const graph = Object.fromEntries(Object.keys(topology.nodes).map((id) => [id, []]))
  topology.edges.forEach((item) => {
    graph[item.a].push({ node: item.b, edgeId: item.id })
    graph[item.b].push({ node: item.a, edgeId: item.id })
  })
  return graph
}

function edgeBetween(topology, a, b) {
  return topology.edges.find((item) => (item.a === a && item.b === b) || (item.a === b && item.b === a))
}

function shortestNodePath(topology, origin, destination) {
  const graph = adjacency(topology)
  const queue = [[origin]]
  const visited = new Set([origin])
  while (queue.length) {
    const path = queue.shift()
    const current = path[path.length - 1]
    if (current === destination) return path
    graph[current].forEach(({ node: next }) => {
      if (!visited.has(next)) {
        visited.add(next)
        queue.push([...path, next])
      }
    })
  }
  return [origin]
}

function ringPath(topology, origin, destination) {
  const order = topology.directedOrder
  const result = [origin]
  let index = order.indexOf(origin)
  while (result[result.length - 1] !== destination) {
    index = (index + 1) % order.length
    result.push(order[index])
  }
  return result
}

function meshPath(topology, origin, destination, variant) {
  const alternatives = Object.keys(topology.nodes).filter((id) => id !== origin && id !== destination)
  return [origin, alternatives[variant % alternatives.length], destination]
}

function pathToStages(topology, path) {
  return path.slice(1).map((to, index) => {
    const from = path[index]
    return { segments: [{ edgeId: edgeBetween(topology, from, to).id, from, to }], arrivals: [to] }
  })
}

function broadcastStages(topology, origin) {
  const graph = adjacency(topology)
  const visited = new Set([origin])
  let frontier = [origin]
  const stages = []
  while (frontier.length) {
    const segments = []
    const nextFrontier = []
    frontier.forEach((from) => {
      graph[from].forEach(({ node: to, edgeId }) => {
        if (!visited.has(to)) {
          visited.add(to)
          nextFrontier.push(to)
          segments.push({ edgeId, from, to })
        }
      })
    })
    if (segments.length) stages.push({ segments, arrivals: nextFrontier })
    frontier = nextFrontier
  }
  return stages
}

export function getAnimationPlan(topology, origin, destination, mode, variant = 0) {
  let stages
  if (mode === 'broadcast') stages = broadcastStages(topology, origin)
  else {
    let path
    if (topology.id === 'Anillo') path = ringPath(topology, origin, destination)
    else if (topology.id === 'Malla') path = meshPath(topology, origin, destination, variant)
    else path = shortestNodePath(topology, origin, destination)
    stages = pathToStages(topology, path)
  }
  return { stages, routeEdges: [...new Set(stages.flatMap((stage) => stage.segments.map((segment) => segment.edgeId)))] }
}
