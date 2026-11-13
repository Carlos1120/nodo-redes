export function calculateSubnet(address, prefix) {
  const octets = address.trim().split('.').map(Number)
  if (octets.length !== 4 || octets.some(n => !Number.isInteger(n) || n < 0 || n > 255) || !Number.isInteger(prefix) || prefix < 1 || prefix > 30) return null
  const ip = octets.reduce((value, octet) => ((value << 8) | octet) >>> 0, 0)
  const mask = (0xffffffff << (32 - prefix)) >>> 0
  const network = (ip & mask) >>> 0
  const broadcast = (network | (~mask >>> 0)) >>> 0
  const dotted = value => [24, 16, 8, 0].map(shift => (value >>> shift) & 255).join('.')
  return { mask: dotted(mask), wildcard: dotted(~mask >>> 0), network: dotted(network), broadcast: dotted(broadcast), first: dotted(network + 1), last: dotted(broadcast - 1), hosts: 2 ** (32 - prefix) - 2, block: 2 ** (32 - prefix), binary: octets.map(n => n.toString(2).padStart(8, '0')).join('.') }
}

export function shortenIpv6(value) {
  const parts = value.trim().split(':')
  if (parts.length !== 8 || parts.some(part => !/^[0-9a-f]{1,4}$/i.test(part))) return null
  const normalized = parts.map(part => parseInt(part, 16).toString(16).toUpperCase())
  let bestStart = -1, bestLength = 1
  for (let i = 0; i < 8;) {
    if (normalized[i] !== '0') { i++; continue }
    let end = i
    while (end < 8 && normalized[end] === '0') end++
    if (end - i > bestLength) { bestStart = i; bestLength = end - i }
    i = end
  }
  if (bestStart < 0) return normalized.join(':')
  const left = normalized.slice(0, bestStart).join(':')
  const right = normalized.slice(bestStart + bestLength).join(':')
  return `${left}::${right}`
}

export function selectRoute(destination, routes) {
  const octets = destination.split('.').map(Number)
  if (octets.length !== 4 || octets.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return null
  const ip = octets.reduce((value, octet) => ((value << 8) | octet) >>> 0, 0)
  return routes.filter(route => {
    const [address, prefixText] = route.network.split('/')
    const prefix = Number(prefixText)
    const network = address.split('.').map(Number).reduce((value, octet) => ((value << 8) | octet) >>> 0, 0)
    const mask = prefix ? (0xffffffff << (32 - prefix)) >>> 0 : 0
    return (ip & mask) === (network & mask)
  }).sort((a, b) => Number(b.network.split('/')[1]) - Number(a.network.split('/')[1]))[0] || null
}
